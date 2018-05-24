import jwt from 'jsonwebtoken';
/* eslint no-undef:0 */
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const signToken = ({ id, role }) => {
  return jwt.sign({
    userId: id,
    role,
  }, secret, { expiresIn: '1h' });
};

export default signToken;
