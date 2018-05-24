import express from 'express';
import UserController from '../controllers/user.controllers';

const router = express.Router();

router.route('/')
  .post(UserController.create);

router.route('/:userId')
  .delete(UserController.softDelete);

router.route('/signin')
  .post(UserController.signin);

export default router;
