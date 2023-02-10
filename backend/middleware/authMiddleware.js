import expressAsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  const auth = req.headers.authorization;

  if (auth && auth.startsWith('Bearer')) {
    try {
      token = auth.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password'); // the select mongoose method select the key returned or, if it is preceded by an -, excludes that key
      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }
  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };
