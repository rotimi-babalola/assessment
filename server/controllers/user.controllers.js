import _ from 'lodash';
import { User, Order } from '../models';
import signToken from '../utils/signToken';
import verifyPassword from '../utils/verifyPassword';

class UserController {
  // create user
  static create(request, response) {
    User.create(request.body)
      .then((newUser) => {
        const token = signToken(newUser);
        response.status(201).send({
          success: true,
          token,
          user: {
            id: newUser.id,
            name: newUser.name,
            role: newUser.role,
            email: newUser.email,
          },
        });
      })
      .catch(error => response.status(500).send(error));
  }

  // sigin
  static signin(request, response) {
    User.findOne({
      where: {
        email: request.body.email,
      },
    }).then((foundUser) => {
      if (!foundUser) {
        return response.status(404).send({
          success: false,
          message: 'User not found',
        });
      } else if (!verifyPassword(request.body.password, foundUser.password)) {
        return response.status(401).send({
          success: false,
          message: 'Signin failed! Incorrect password',
        });
      }

      const token = signToken(foundUser);
      return response.status(200).send({
        success: true,
        message: 'Signin successful!',
        token,
        user: {
          id: foundUser.id,
          name: foundUser.name,
          role: foundUser.role,
          email: foundUser.email,
        },
      });
    }).catch(error => response.status(500).send(error));
  }

  static softDelete(request, response) {
    User.findById(request.params.userId)
      .then((foundUser) => {
        if (!foundUser) {
          return response.status(404).send({
            success: false,
            message: 'User not found!',
          });
        } else if (foundUser.isDeleted) {
          return response.status(400).send({
            success: false,
            message: 'User can not be undeleted once deleted',
          });
        }
        foundUser.update({
          isDeleted: true,
        }).then(() => {
          return response.status(200).send({
            success: true,
            message: 'User has been deleted',
          });
        }).catch(error => response.status(500).send(error));
      }).catch(error => response.status(500).send(error));
  }

  static list(request, response) {
    User.findAll({
      include: [{
        model: Order,
        as: 'orders',
      }],
    }).then(users => {
      const fields = ['_id',
        'name',
        'email',
        'role',
        'isDeleted',
        'createdAt',
        'updateAt',
        'orders'];
      const picked = _.map(users, _.partialRight(_.pick, fields));
      return response.status(200).send({
        message: 'Users',
        user: picked,
      });
    }).catch(error => response.status(500).send(error));
  }
}

export default UserController;
