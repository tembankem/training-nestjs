import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
    ) {}

    async findByEmail(email: string): Promise<Users | undefined> {
        console.log(email)
        return await this.userRepository.findOne({
            where: {email: email},
        }).then((entity) => {
            if (!entity) {
                return Promise.reject(new NotFoundException('User not found'));
            }

            return Promise.resolve(entity ?? null)
        });
    }
}
