import express from 'express';
import OrderController from '../controllers/order.controller';
import Middleware from '../middleware/middleware';

const router = express.Router();

router.route('/')
  .get(Middleware.decodeToken, OrderController.getOrders)
  .post(Middleware.decodeToken, OrderController.create);

export default router;
