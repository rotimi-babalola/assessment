import { User } from '../models';

class UserController {
  static create(request, response) {
    User.create(request.body)
      .then((newUser) => response.status(201).send(newUser))
      .catch(error => response.status(500).send(error));
  }
}

export default UserController;
