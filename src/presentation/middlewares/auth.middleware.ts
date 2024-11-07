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
      if ( !payload ) throw new CustomError(401, 'Invalid token');

      // // const user = await UserModel.findById(payload.id);
      // // if ( !user ) return res.status(401).json({ error: 'Invalid token - user not found' })


      // req.body.payload = payload;

      console.log("Pasando por el middle")
      console.log(payload);

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