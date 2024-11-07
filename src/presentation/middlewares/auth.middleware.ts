import { NextFunction, Request, Response } from "express";
import { JwtAdapter } from "../../config";
import { UserModel } from "../../data/mongodb";
import { CustomError } from "../../domain";



export class AuthMiddleware {

  static validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.header('Authorization');
    try {

      if (!authorization) {
        throw new CustomError(401, 'Authorization header not found');
      }
      if (!authorization.startsWith('Bearer ')) throw new CustomError(401, 'Invalid token');

      const token = authorization.split(' ').at(1) || '';
      



      // // todo:
      const payload = await JwtAdapter.validateToken(token);

      console.log(payload);

      if ( !payload ) throw new CustomError(401, 'Invalid token');

      if (typeof payload !== 'object') throw new CustomError(401, 'Invalid token - object');

      if (!payload.hasOwnProperty('id')) throw new CustomError(401, 'Invalid token - id');

      
      const user = await UserModel.findById(payload.id);
      if ( !user ) throw new CustomError(401, 'Invalid token');


      req.body.payload = payload;

      console.log(user)
      
      next();
    } catch (error) {
      if (error instanceof CustomError) {
        console.log({
          error: error.message,
          statusCode: error.statusCode
        })
        res.status(error.statusCode).json({ error: error.message, statusCode: error.statusCode });
      } else {
        console.log({
          error: 'Internal server error',
          statusCode: 500
        })
      res.status(500).json({ error: 'Internal server error' });
      }
    }
  }

}