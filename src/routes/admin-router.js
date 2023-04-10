const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController');
const CakeController = require('../controllers/CakeController');
const adminControl = new AdminController();
const cakeControl = new CakeController();

adminRouter.get('/', adminControl.checkPermission, adminControl.show);
adminRouter.get('/cake', adminControl.checkPermission, cakeControl.total_cake, cakeControl.filter, cakeControl.cakes);

module.exports = adminRouter;
