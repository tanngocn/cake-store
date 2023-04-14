const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController');
const CakeController = require('../controllers/CakeController');
const adminControl = new AdminController();
const cakeControl = new CakeController();

adminRouter.get('/', adminControl.checkPermission, adminControl.show);
adminRouter.get('/cake', adminControl.checkPermission, cakeControl.total_cake, cakeControl.filter, cakeControl.cakes);
adminRouter.get('/cake/add', adminControl.checkPermission, cakeControl.cake_types, adminControl.show_add_cakes);
adminRouter.post('/cake/add', adminControl.checkPermission, adminControl.add_cake_action);

module.exports = adminRouter;
