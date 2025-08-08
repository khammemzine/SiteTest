const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const drawingsDir = path.join(__dirname, '../public/drawings');

router.get('/', (req, res) => {
  const files = fs.existsSync(drawingsDir) ? fs.readdirSync(drawingsDir) : [];
  const baseUrl = '/drawings/file/';
  res.json(files.map(file => ({ name: file, url: baseUrl + encodeURIComponent(file) })));
});

router.get('/file/:name', (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(drawingsDir, fileName);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Not found' });

  if (req.session.user) {
    return res.download(filePath);
  }
  res.status(403).json({ message: 'Not authorized' });
});

module.exports = router;