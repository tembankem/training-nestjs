import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}

    async findByEmail(email: string): Promise<Users | undefined> {
        return await this.userRepository.findOne({
            where: {email: email},
        }).then((entity) => {
            if (!entity) {
                return Promise.reject(new NotFoundException('User not found'));
            }

            return Promise.resolve(entity ?? null)
        });
    }

    async create(createUserDto: CreateUserDto): Promise<Users> {
        const user = this.userRepository.create(createUserDto);
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        return await this.userRepository.save(user);
    }
}
