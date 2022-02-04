import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private usersRepository:UserRepository){}

    async signUp(authCredentialsDTO:AuthCredentialsDTO):Promise<void>{
        return this.usersRepository.createUser(authCredentialsDTO);
    }
}
