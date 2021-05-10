import { DynamicModule, Global, Module } from '@nestjs/common'
import { JwtService } from './jwt.service'
import { JwtModuleOptions } from './jwt.interfaces'
import { CONFIG_OPTIONS } from '../common/common.constants'

@Module({
    providers: [JwtService],
})
@Global()
export class JwtModule {
    static foRoot(options: JwtModuleOptions): DynamicModule {
        return {
            module: JwtModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                JwtService,
            ],
            exports: [JwtService],
        }
    }
}
