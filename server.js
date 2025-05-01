const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Handle API endpoint for patient submission
  if (req.method === 'POST' && req.url === '/api/patients') {
    let body = '';
    
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const patientData = JSON.parse(body);
        console.log('Received patient data:', patientData);
        
        // In a real app, you would save this data to a database
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: true, 
          message: 'Patient information submitted successfully' 
        }));
      } catch (error) {
        console.error('Error processing patient data:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
          success: false, 
          message: 'Invalid patient data format' 
        }));
      }
    });
    
    return;
  }
  
  // Serve static files
  let filePath = req.url === '/' ? './index.html' : '.' + req.url;
  
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found
        fs.readFile('./index.html', (err, content) => {
          if (err) {
            // Something went very wrong
            res.writeHead(500);
            res.end('Server Error: ' + err.code);
          } else {
            // Return the index.html for any route that doesn't exist
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          }
        });
      } else {
        // Server error
        res.writeHead(500);
        res.end('Server Error: ' + error.code);
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${PORT}/`);
});