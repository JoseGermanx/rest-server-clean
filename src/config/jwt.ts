import jwt from 'jsonwebtoken';
import { envs } from './envs';


// const JWT_SEED = envs.JWT_SEED;
interface Payload {
  id: string;
  ia: string;
  exp: number;
}

export class JwtAdapter {

  static async generateToken( 
    payload: Object, 
    duration: string = '2h' ): Promise<string|null> {

    return new Promise( ( resolve ) => {

      // todo: generación del seed
      jwt.sign( payload, "JWT_SEED", { expiresIn: duration }, (err, token) => {

        if ( err ) return resolve(null);

        resolve(token!);
      });


    } );


  }


  static validateToken( token: string ): Promise<Payload|null> {

    return new Promise( (resolve) => {

      jwt.verify( token, "JWT_SEED", (err, decoded) => {

        if ( err ) return resolve(null);

        resolve(decoded as Payload);

      });


    });


  }


}

