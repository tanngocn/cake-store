const express = require('express');
const adminRouter = express.Router();
const AdminController = require('../controllers/AdminController');
const adminControl = new AdminController();

adminRouter.get('/', adminControl.checkPermission, adminControl.show);

module.exports = adminRouter;
