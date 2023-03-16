const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
      res.redirect('/login'); // TODO: /login works, but /hompage doesn't. Why?
    } else {
      next();
    }
  };
  
  module.exports = withAuth;
  