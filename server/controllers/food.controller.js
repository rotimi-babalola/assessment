import { Food } from '../models';

class FoodController {
  static create(request, response) {
    Food.create(request.body)
      .then((newFood) => {
        response.status(201).send({
          success: true,
          newFood,
        });
      })
      .catch(error => response.status(500).send(error));
  }

  static list(request, response) {
    Food.findAll()
      .then(allFoods => {
        return response.status(200).send({
          allFoods,
        });
      })
      .catch(error => response.status(500).send(error));
  }

  static updateById(request, response) {
    Food.findById(request.params.foodId)
      .then((foodToUpdate) => {
        if (!foodToUpdate) {
          return response.status(404).send({
            success: false,
            message: 'Food not found!',
          });
        }

        foodToUpdate.update({
          name: request.body.name || foodToUpdate.name,
          price: request.body.price || foodToUpdate.price,
          description: request.body.description || foodToUpdate.description,
        }).then(() => {
          return response.status(200).send({
            success: true,
            message: 'Food has been updated',
            foodToUpdate,
          });
        }).catch(error => response.status(500).send(error));
      }).catch(error => response.status(500).send(error));
  }

  static delete(request, response) {
    Food.findById(request.params.foodId)
      .then((foodToDelete) => {
        if (!foodToDelete) {
          return response.status(404).send({
            success: false,
            message: 'Food not found!',
          });
        }

        foodToDelete.destroy().then(() => {
          return response.status(200).send({
            success: true,
            message: 'Food has been deleted',
          });
        }).catch(error => response.status(500).send(error));
      }).catch(error => response.status(500).send(error));
  }
}

export default FoodController;
