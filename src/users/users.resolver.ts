/* eslint-disable @typescript-eslint/no-unused-vars */
import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'
import { CreateAccountInput, CreateAccountOutput } from './dtos/create-account.dto'
import { LoginInput, LoginOutput } from './dtos/login.dto'
import { AuthGuard } from '../auth/auth.guard'
import { UseGuards } from '@nestjs/common'
import { AuthUser } from '../auth/auth-user.decorator'
import { UserProfileInput, UserProfileOutput } from './dtos/user-profile.dto'

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Тестовый запрос
     * @access  Public
     */
    @Query((returns) => Boolean)
    hi(): boolean {
        return true
    }

    /**
     *  Получение данных о себе
     *  @access     Private (токен)
     */
    @Query((returns) => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        return authUser
    }

    /**
     * Получение пользователя по id
     * @access      Private (токен)
     */
    @Query((returns) => UserProfileOutput)
    @UseGuards(AuthGuard)
    async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        try {
            const user = await this.usersService.userById(userProfileInput.userId)

            if (!user) throw Error()

            return {
                ok: true,
                user,
            }
        } catch (e) {
            return {
                error: 'User not found',
                ok: false,
            }
        }
    }

    /**
     * Создания пользователя
     * @access      private
     * @mutation    таблица user
     */
    @Mutation((returns) => CreateAccountOutput)
    async createAccount(
        @Args('input') createAccountInput: CreateAccountInput,
    ): Promise<CreateAccountOutput> {
        try {
            const { ok, error } = await this.usersService.createAccount(createAccountInput)

            return {
                ok,
                error,
            }
        } catch (error) {
            return {
                error,
                ok: false,
            }
        }
    }

    /**
     * Авторизация с получения токена
     * @access      private
     * @mutation    ничего
     */
    @Mutation((returns) => LoginOutput)
    async login(@Args('input') loginInput: LoginInput): Promise<LoginOutput> {
        try {
            return await this.usersService.login(loginInput)
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }
}
