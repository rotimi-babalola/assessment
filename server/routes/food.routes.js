import express from 'express';
import FoodController from '../controllers/food.controller';
import Middleware from '../middleware/middleware';

const router = express.Router();

router.route('/')
  .get(Middleware.decodeToken, FoodController.list)
  .post(Middleware.decodeToken, Middleware.verifyAdmin, FoodController.create);

router.route('/:foodId')
  .put(Middleware.decodeToken, Middleware.verifyAdmin, FoodController.updateById)
  .delete(Middleware.decodeToken, Middleware.verifyAdmin, FoodController.delete);

export default router;
