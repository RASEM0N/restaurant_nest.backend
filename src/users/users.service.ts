import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/users.entity'
import { Repository } from 'typeorm'
import { CreateAccountInput } from './dtos/create-account.dto'
import { LoginInput } from './dtos/login.dto'
import * as jwt from 'jsonwebtoken'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '../jwt/jwt.service'

// отсюда происходит взаимодействие с сервером
// create, find ...

interface Response {
    ok: boolean
    error?: string
}

interface ResponseLogin extends Response {
    token?: string
}

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    async createAccount({ email, password, role }: CreateAccountInput): Promise<Response> {
        try {
            const exists = await this.users.findOne({ email })
            if (exists) {
                return { ok: false, error: 'There is a user with that email already' }
            }
            await this.users.save(this.users.create({ email, password, role }))
            return {
                ok: true,
            }
        } catch (e) {
            return { ok: false, error: "Couldn't create account" }
        }
    }

    async login({ email, password }: LoginInput): Promise<ResponseLogin> {
        try {
            const user = await this.users.findOne({ email })

            if (!user) {
                return {
                    ok: false,
                    error: 'User not found',
                }
            }

            const passwordCorrect = await user.checkPassword(password)

            if (!passwordCorrect) {
                return {
                    ok: false,
                    error: 'Wrong password',
                }
            }

            const token = this.jwtService.sign(user.id)
            return {
                ok: true,
                token,
            }
        } catch (error) {
            return { ok: false, error }
        }
    }

    async userById(id: number): Promise<User> {
        return this.users.findOne({
            id: id,
        })
    }
}
