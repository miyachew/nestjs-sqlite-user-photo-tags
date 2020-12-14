import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from './config.constants';
import { ConfigService } from './config.service';
import { ConfigModuleOptions } from './interfaces/confg.interface';

@Module({})
export class ConfigModule {
    static register(options: ConfigModuleOptions): DynamicModule {
        return {
            module: ConfigModule,
            providers: [
                {
                    provide: CONFIG_OPTIONS,
                    useValue: options,
                },
                ConfigService
            ],
            exports: [ConfigService],
        };
    }
}
