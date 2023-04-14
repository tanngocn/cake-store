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
  show_add_cakes(req, res, next) {
    res.render('admin/add-cake', { title: 'Create cake', types: req.cakeTypes, cake: {} });
  }
  add_cake_action(req, res, next) {
    console.log(req);
  }

  update_cake_action(req, res, next) {}
}

module.exports = AdminController;
