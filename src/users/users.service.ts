import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/users.entity'
import { Repository } from 'typeorm'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}
}
