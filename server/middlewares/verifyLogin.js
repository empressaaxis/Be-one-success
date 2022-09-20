import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const verifyLogin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (verify) {
      req.user = verify;
      next();
    } else {
      res.status(403).json({
        status: 403,
        errorMessage: 'Failed to Authenticate'
      });
    }
  } catch (error) {
    res.status(403).json({
      status: 403,
      errorMessage: 'Failed to Authenticate'
    });
  }
};

export default verifyLogin;
