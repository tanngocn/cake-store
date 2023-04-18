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
    console.log(req.cake_detail);
    res.render('admin/add-cake', { title: req.cake_detail ? 'Update cake' : 'Create cake', types: req.cakeTypes, cake: req.cake_detail });
  }

}

module.exports = AdminController;
