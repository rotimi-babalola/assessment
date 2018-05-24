import jwt from 'jsonwebtoken';

/* eslint no-undef:0 */
require('dotenv').config();
const secret = process.env.JWT_SECRET;

class Middleware {
  static decodeToken(request, response, next) {
    const token = request.body.token || request.headers.authorization || request.headers['x-access-token'];
    if (!token) {
      return response.status(401).send({
        success: false,
        message: 'Please supply a token for this route',
      });
    }
    jwt.verify(token, secret, (error, decoded) => {
      if (error) {
        return response.status(401).send({
          success: false,
          message: 'Failed to verify token',
        });
      }
      // save decoded to request object
      request.decoded = decoded;
      next();
    });
  }

  static verifyAdmin(request, response, next) {
    if (request.decoded.role !== 'Admin') {
      return response.status(403).send({
        success: false,
        message: 'This route is only for Admins',
      });
    }
    next();
  }
}

export default Middleware;
