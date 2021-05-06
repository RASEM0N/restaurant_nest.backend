import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/users.entity'
import { Repository } from 'typeorm'
import { CreateAccountInput } from './dtos/create-account.dto'

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private readonly users: Repository<User>) {}

    async createAccount({
        email,
        password,
        role,
    }: CreateAccountInput): Promise<[boolean, string?]> {
        try {
            const exists = await this.users.findOne({ email })
            if (exists) {
                return [false, 'There is a user with that email already']
            }
            await this.users.save(this.users.create({ email, password, role }))
            return [true]
        } catch (e) {
            return [false, "Couldn't create account"]
        }
    }
}
