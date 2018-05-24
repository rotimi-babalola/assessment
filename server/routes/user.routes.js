import express from 'express';
import UserController from '../controllers/user.controllers';
import Middleware from '../middleware/middleware';

const router = express.Router();

router.route('/')
  .post(UserController.create);

router.route('/:userId')
  .delete(Middleware.decodeToken, Middleware.verifyAdmin, UserController.softDelete);

router.route('/signin')
  .post(UserController.signin);

export default router;
