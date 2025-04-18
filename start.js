
const { spawn } = require('child_process');
const path = require('path');

// Start the frontend (Vite)
const frontend = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true
});

// Start the backend (Express)
const backend = spawn('node', ['--loader', 'ts-node/esm', 'src/server.ts'], {
  stdio: 'inherit',
  shell: true
});

// Handle process termination
process.on('SIGINT', () => {
  frontend.kill();
  backend.kill();
  process.exit();
});

console.log('🚀 Frontend and backend servers started');
