class AdminController {
  checkPermission(req, res, next) {
    const { user } = req;
    const isAdmin = user && user[0] && user[0].is_admin;

    if (isAdmin) {
      return next();
    } else {
      console.error('Access denied');
      res.redirect('/');
    }
  }
  show(req, res, next) {
    res.render('admin', { title: 'Admin page' });
  }
}

module.exports = AdminController;
