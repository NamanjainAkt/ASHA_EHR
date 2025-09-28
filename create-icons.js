const fs = require('fs');
const path = require('path');

// Create a simple SVG icon
const svgIcon = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
  <rect width="512" height="512" rx="64" fill="#2563EB"/>
  <circle cx="256" cy="256" r="180" fill="white"/>
  <circle cx="256" cy="256" r="140" fill="#2563EB"/>
  <rect x="226" y="186" width="60" height="80" rx="8" fill="white"/>
  <circle cx="256" cy="156" r="20" fill="white"/>
  <rect x="236" y="286" width="40" height="30" rx="15" fill="white"/>
  <text x="256" y="400" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="48" font-weight="bold">ASHA</text>
</svg>`;

// Write SVG file
fs.writeFileSync(path.join(__dirname, 'public', 'icon.svg'), svgIcon);

console.log('Icon created! Please convert this SVG to PNG files using an online converter or image editing tool.');
console.log('Required sizes: 72x72, 96x96, 128x128, 144x144, 152x152, 192x192, 384x384, 512x512');