import { User } from '../models';

class UserController {
  static create(request, response) {
    User.create(request.body)
      .then((newUser) => response.status(201).send({
        success: true,
        user: {
          id: newUser.id,
          name: newUser.name,
          role: newUser.role,
          email: newUser.email,
        },
      }))
      .catch(error => response.status(500).send(error));
  }
}

export default UserController;
