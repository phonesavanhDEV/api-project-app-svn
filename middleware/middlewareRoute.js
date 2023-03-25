const express = require('express');
const router = express.Router();
const path = require('path');

function serveHome(req, res, next) {
  if (req.url === '/home') {
    res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));
  } else {
    next();
  }
}

function serveLogin(req, res, next) {
    if (req.url === '/login') {
      res.sendFile(path.join(__dirname, '..', 'views', 'login.html'));
    } else {
      next();
    }
}
  
function serveRegister(req, res, next) {
    if (req.url === '/register') {
      res.sendFile(path.join(__dirname, '..', 'views', 'register.html'));
    } else {
      next();
    }
}

router.use(serveHome);
router.use(serveLogin);
router.use(serveRegister);

module.exports = router;
