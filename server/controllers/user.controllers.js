import { User } from '../models';
import signToken from '../utils/signToken';

class UserController {
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
}

export default UserController;
