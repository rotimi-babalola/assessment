import { Order } from '../models';

class OrderController {
  static create(request, response) {
    const { foodId, name } = request.body;
    const userId = request.decoded.userId;

    Order.create({ name, foodId, userId })
      .then((newOrder) => {
        response.status(201).send({
          success: true,
          newOrder,
        });
      }).catch(error => response.status(500).send(error));
  }

  static getOrders(request, response) {
    // const whereStatement = {};
    const isAdmin = request.decoded.role === 'Admin';
    Order.findAll(isAdmin ? {} : {
      where: {
        userId: request.decoded.userId,
      },
    }).then(foundOrders => {
      return response.status(201).send({
        success: true,
        foundOrders,
      });
    }).catch(error => response.status(500).send(error));
  }
}

export default OrderController;
