import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// Serve static assets from public/ directory first if requested
const publicDir = path.join(__dirname, 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
}

// Serve static assets from workspace root (images, fonts, styles.css, app.js, qrcode.min.js)
app.use(express.static(__dirname));

// Route rewrites according to vercel.json
app.get(['/guest', '/menu'], (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Single Page Application fallback for all navigation requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Shamba House Tableside OS running at http://${HOST}:${PORT}`);
});
