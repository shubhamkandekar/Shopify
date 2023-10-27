import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryCaontroller } from '../controllers/categoryController.js';

const router = express.Router()

//routes

//create category
router.post('/create-category',requireSignIn,isAdmin, createCategoryController)

//update category
router.put('/update-category/:id',requireSignIn,isAdmin,updateCategoryCaontroller)

// Get All Category
router.get('/get-category',categoryController)

// Get Single Category
router.get('/single-category/:slug',singleCategoryController)

//delete Category
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategoryController)


export default router