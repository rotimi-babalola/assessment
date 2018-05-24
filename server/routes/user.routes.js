import express from 'express';
import UsercController from '../controllers/user.controllers';

const router = express.Router();

router.route('/')
  .post(UsercController.create);

export default router;
