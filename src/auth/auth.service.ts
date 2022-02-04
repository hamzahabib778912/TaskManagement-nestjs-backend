import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import { UserRepository } from './users.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private usersRepository:UserRepository){}

    async signUp(authCredentialsDTO:AuthCredentialsDTO):Promise<void>{
        return this.usersRepository.createUser(authCredentialsDTO);
    }

    async signIn(authCredentialsDTO:AuthCredentialsDTO):Promise<string>{
        const {username, password} = authCredentialsDTO;
        const user = await this.usersRepository.findOne({username});
        if(user && (await bcrypt.compare(password,user.password))){
            return 'success'
        }else{
            throw new UnauthorizedException("Please check your login credentials");
        }
    }
}
