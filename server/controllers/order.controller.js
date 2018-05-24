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

  static updateOrder(request, response) {
    Order.find({
      where: {
        id: request.params.orderId,
        userId: request.decoded.userId,
      },
    })
      .then((orderToUpdate) => {
        if (!orderToUpdate) {
          return response.status(404).send({
            success: false,
            message: 'Order not found',
          });
        }

        orderToUpdate.update({
          foodId: request.body.foodId || orderToUpdate.foodId,
        }).then(() => {
          return response.status(200).send({
            success: true,
            message: 'Order has been updated',
            orderToUpdate,
          });
        }).catch(error => response.status(500).send(error));
      }).catch(error => response.status(500).send(error));
  }

  static cancelOrder(request, response) {
    Order.find({
      where: {
        id: request.params.orderId,
        userId: request.decoded.userId,
      },
    }).then((orderToDelete) => {
      if (!orderToDelete) {
        return response.status(404).send({
          success: false,
          message: 'Order not found',
        });
      }
      orderToDelete.destroy().then(() => {
        return response.status(200).send({
          success: true,
          message: 'Order has been deleted',
        });
      }).catch(error => response.status(500).send(error));
    }).catch(error => response.status(500).send(error));
  }
}

export default OrderController;
