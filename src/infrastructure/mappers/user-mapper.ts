import { CustomError, UserEntity } from "../../domain";


export class UserMapper {

    static useEntityFromObject(object: { [key: string]: any }) {

        const { id, _id, name, email, password } = object;

        if (!id || !_id) throw CustomError.badRequest('Invalid id');
        if (!name) throw CustomError.badRequest('Invalid name');
        if (!email) throw CustomError.badRequest('Invalid email');
        if (!password) throw CustomError.badRequest('Invalid password');
        
        return new UserEntity(
            id || _id,
            name,
            email,
            password,
        );
    }
}