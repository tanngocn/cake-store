const express = require('express');
const methodOverride = require('method-override');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController');
const CakeController = require('../controllers/CakeController');
const adminControl = new AdminController();
const cakeControl = new CakeController();


adminRouter.use(methodOverride('_method'));
adminRouter.get('/', adminControl.checkPermission, adminControl.show);
adminRouter.get('/cake', adminControl.checkPermission, cakeControl.total_cake, cakeControl.filter, cakeControl.cakes);
adminRouter.get('/cake/add', adminControl.checkPermission, cakeControl.cake_types, adminControl.show_add_cakes);
adminRouter.post('/cake/add', adminControl.checkPermission, cakeControl.checkValidation, cakeControl.add_cake_action);
adminRouter.get('/cake/update/:id', adminControl.checkPermission, cakeControl.checkCakeExisting, cakeControl.cake_types, adminControl.show_add_cakes);
adminRouter.put('/cake/update/:id', adminControl.checkPermission, cakeControl.checkValidation, cakeControl.update_cake_action)

module.exports = adminRouter;
