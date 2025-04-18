
import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import sharp from 'sharp';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, 'original-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error('Only .jpeg, .png, and .webp formats are allowed'));
    }
    cb(null, true);
  }
});

// Serve static files from uploads directory
app.use('/uploads', express.static(uploadsDir));

// Routes
app.post('/api/upload', upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    return res.status(200).json({
      message: 'File uploaded successfully',
      filename: req.file.filename,
      filepath: `/uploads/${req.file.filename}`
    });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ error: 'File upload failed' });
  }
});

app.post('/api/enhance', express.json(), async (req, res) => {
  try {
    const { filename, scale, enhancementType } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'No filename provided' });
    }
    
    const originalPath = path.join(uploadsDir, filename);
    if (!fs.existsSync(originalPath)) {
      return res.status(404).json({ error: 'Original image not found' });
    }
    
    // Create enhanced filename
    const fileExt = path.extname(filename);
    const enhancedFilename = `enhanced-${Date.now()}${fileExt}`;
    const enhancedPath = path.join(uploadsDir, enhancedFilename);
    
    // Basic enhancement with sharp
    let sharpImage = sharp(originalPath);
    
    // Apply scale factor (2x, 4x, etc.)
    const scaleFactor = parseInt(scale) || 2;
    const metadata = await sharpImage.metadata();
    const width = metadata.width || 0;
    const height = metadata.height || 0;
    
    sharpImage = sharpImage.resize(width * scaleFactor, height * scaleFactor);
    
    // Apply enhancement type
    switch (enhancementType) {
      case 'sharpen':
        sharpImage = sharpImage.sharpen({ sigma: 2 }).modulate({ brightness: 1.05, saturation: 1.2 });
        break;
      case 'denoise':
        sharpImage = sharpImage.median(1).modulate({ brightness: 1.05 });
        break;
      case 'enhance':
        sharpImage = sharpImage.sharpen().modulate({ brightness: 1.1, saturation: 1.3 });
        break;
      default:
        sharpImage = sharpImage.sharpen({ sigma: 1 }).modulate({ brightness: 1.05, saturation: 1.1 });
    }
    
    // Save the enhanced image
    await sharpImage.toFile(enhancedPath);
    
    res.status(200).json({
      message: 'Image enhanced successfully',
      enhancedFilename,
      enhancedUrl: `/uploads/${enhancedFilename}`
    });
  } catch (error) {
    console.error('Enhancement error:', error);
    res.status(500).json({ error: 'Image enhancement failed' });
  }
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
