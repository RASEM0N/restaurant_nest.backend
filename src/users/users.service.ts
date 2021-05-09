import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/users.entity'
import { Repository } from 'typeorm'
import { CreateAccountInput } from './dtos/create-account.dto'
import { LoginInput } from './dtos/login.dto'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '../jwt/jwt.service'
import { EditProfileInput } from './dtos/edit-profile.dto'

// отсюда происходит взаимодействие с сервером
// create, find ...

interface Response {
    ok: boolean
    error?: string
}

/**
 * Жопа
 */
interface ResponseLogin extends Response {
    token?: string
}

/**
 * Тут храниться логика в девственном ввиде
 */
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        private readonly config: ConfigService,
        private readonly jwtService: JwtService,
    ) {}

    /**
     * Создание нового аккаунта (регестрация)
     */
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

    /**
     * Авторизация
     */
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

    /**
     * Берем пользователя по id
     */
    async userById(id: number): Promise<User> {
        return this.users.findOne({
            id: id,
        })
    }

    /**
     *  Редактируем профиль
     */
    async editProfile(userId: number, { email, password }: EditProfileInput) {
        const user = await this.users.findOne(userId)

        if (email) user.email = email

        if (password) user.password = password

        // Does not check if entity exist in the database.
        // - Поэтому мы не используем, ибо пароль не закэшеируется
        // this.users.update(userId, { email, password })
        return this.users.save(user)
    }
}
