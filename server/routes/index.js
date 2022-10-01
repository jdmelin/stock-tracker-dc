const router = require('express').Router();

router.get('/', (req, res) => {
  res.send('Home');
  // res.render('template', {
  //   locals: {
  //     loggedIn: req.session.user,
  //   },
  //   partials: {
  //     partial: '/partials/home',
  //   },
  // });
});

module.exports = router;
