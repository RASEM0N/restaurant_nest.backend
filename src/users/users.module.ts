import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/users.entity'
import { UsersService } from './users.service'
import { UsersResolver } from './users.resolver'
import { Verification } from '../common/entities/verification.entity'

@Module({
    imports: [TypeOrmModule.forFeature([User, Verification])],
    providers: [UsersService, UsersResolver],
    exports: [UsersService],
})
export class UsersModule {}
