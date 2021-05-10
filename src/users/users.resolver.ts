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
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto'
import { VerifyEmailInput, VerifyEmailOutput } from './dtos/verify-email.dto'

@Resolver((of) => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    /**
     * Тестовый запрос
     * @access      Public
     * @type        Query
     */
    @Query((returns) => Boolean)
    hi(): boolean {
        return true
    }

    /**
     *  Получение данных о себе
     *  @access     Private (токен)
     *  @type       Query
     */
    @Query((returns) => User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        return authUser
    }

    /**
     * Получение пользователя по id
     * @access      Private (токен)
     * @type        Query
     */
    @Query((returns) => UserProfileOutput)
    @UseGuards(AuthGuard)
    async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput> {
        try {
            const user = await this.usersService.userById(userProfileInput.userId)

            if (!user) throw Error()
            console.log(user)
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
     * @access      Public
     * @mutation    таблица users
     * @type        Mutation
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
     * @access      Public
     * @mutation    ничего
     * @type        Mutation
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

    /**
     * Редактируем профиль
     * @access      Private (токен)
     * @mutation    таблица users
     * @type        Mutation
     */
    @Mutation((returns) => EditProfileOutput)
    @UseGuards(AuthGuard)
    async editProfile(
        @AuthUser() authUser: User,
        @Args('input') editProfileInput: EditProfileInput,
    ): Promise<EditProfileOutput> {
        try {
            await this.usersService.editProfile(authUser.id, editProfileInput)
            return {
                ok: true,
            }
        } catch (error) {
            return {
                ok: false,
                error,
            }
        }
    }

    @Mutation((returns) => VerifyEmailOutput)
    verifyEmail(@Args('input') { code }: VerifyEmailInput): Promise<VerifyEmailOutput> {
        return this.usersService.verifyEmail(code)
    }
}
