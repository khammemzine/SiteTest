const express = require('express');
const router = express.Router();

// NOTE: في مشروع حقيقي يجب استخدام قاعدة بيانات وهاش لكلمات المرور.
// هنا نمط مبسَّط للتجربة: يوجد مستخدم واحد ثابت باسم member/1234

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'member' && password === '1234') {
    req.session.user = { username };
    return res.json({ message: 'Login successful', isMember: true });
  }
  res.status(401).json({ message: 'Invalid credentials' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Error logging out' });
    res.clearCookie('sid');
    res.json({ message: 'Logged out' });
  });
});

router.get('/check', (req, res) => {
  if (req.session.user) return res.json({ isMember: true });
  res.json({ isMember: false });
});

module.exports = router;