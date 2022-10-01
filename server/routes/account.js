const router = require('express').Router();
const userController = require('../controllers/user-controller');

router.get('/login', (req, res) => {
  // res.render('template', {
  //   locals: {
  //     loggedIn: false,
  //   },
  //   partials: {
  //     partial: '/partials/login',
  //   },
  // });
  res.send('login')
});

router.get('/register', (req, res) => {
  // res.render('template', {
  //   locals: {
  //     loggedIn: false,
  //   },
  //   partials: {
  //     partial: '/partials/register',
  //   },
  // });
  res.send('register')
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

router.route('/api/login').post(userController.logIn);

router.route('/register').post(userController.register);

module.exports = router;
