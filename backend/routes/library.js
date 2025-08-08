const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();

const booksDir = path.join(__dirname, '../public/books');

// رجّع لائحة الكتب (أسماء + رابط عرض)
router.get('/', (req, res) => {
  const files = fs.existsSync(booksDir) ? fs.readdirSync(booksDir) : [];
  const baseUrl = '/library/file/';
  res.json(files.map(file => ({ name: file, url: baseUrl + encodeURIComponent(file) })));
});

// تحميل الملف (محمية للمشتركين)
router.get('/file/:name', (req, res) => {
  const fileName = req.params.name;
  const filePath = path.join(booksDir, fileName);
  if (!fs.existsSync(filePath)) return res.status(404).json({ message: 'Not found' });

  if (req.session.user) {
    return res.download(filePath);
  }
  // إن لم يكن عضوًا، نرسل رابط عرض (يمكن استخدام proxy للعرض داخل الواجهة)
  res.status(403).json({ message: 'Not authorized' });
});

module.exports = router;