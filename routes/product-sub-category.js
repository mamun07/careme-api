// Main Module Required..
const express = require('express');

// Created Require Files..
const controller = require('../controller/product-sub-category');
const checkAdminAuth = require('../middileware/check-admin-auth');
const checkIpWhitelist = require('../middileware/check-ip-whitelist');
const router = express.Router();

/**
 * /product-category
 * http://localhost:5502/api/product-sub-category
 */

// Create
router.post('/add-sub-category',checkIpWhitelist,checkAdminAuth, controller.addSubCategory);
router.post('/add-multiple-sub-category',checkIpWhitelist,checkAdminAuth, controller.insertManySubCategory);

// Read
router.get('/get-all-sub-categories', controller.getAllSubCategory);
router.post('/get-sub-categories-by-dynamic-sort', controller.getSubCategorysByDynamicSort);
router.get('/get-sub-category-by-sub-category-id/:subCategoryId', controller.getSubCategoryBySubCategoryId);
router.post('/get-sub-categories-by-search', controller.getSubCategoriesBySearch);
router.get('/get-sub-category-by-category-id/:categoryId', controller.getSubCategoryByCategoryId);
router.get('/get-sub-category-by-sub-category-slug/:subCategorySlug', controller.getSubCategoryBySubCategorySlug);

//Update
router.put('/edit-sub-category-by-sub-category',checkIpWhitelist,checkAdminAuth, controller.editSubCategoryData);

//Delete
router.delete('/delete-sub-category-by-id/:subCategoryId',checkIpWhitelist,checkAdminAuth, controller.deleteSubCategoryBySubCategoryId);

// Export All router..
module.exports = router;
