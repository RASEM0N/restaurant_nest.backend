import { Test } from '@nestjs/testing'
import { UsersService } from './users.service'

let service: UsersService

describe('UserService', () => {
    beforeAll(async () => {
        const modules = await Test.createTestingModule({
            providers: [UsersService],
        }).compile()
        service = modules.get<UsersService>(UsersService)
    })

    it('be defined', () => {
        expect(service).toBeDefined()
    })

    it.todo('createAccount')
    it.todo('login')
    it.todo('userById')
    it.todo('editProfile')
    it.todo('verifyEmail')
})
