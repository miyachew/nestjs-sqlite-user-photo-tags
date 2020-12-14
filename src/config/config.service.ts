import { Inject, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { CONFIG_OPTIONS } from './config.constants';
import { ConfigOptions } from './interfaces/confg.interface';
import { EnvConfig } from './interfaces/envconfig.interface';

@Injectable()
export class ConfigService {
    private readonly envConfig: EnvConfig;

    constructor(@Inject(CONFIG_OPTIONS) options: ConfigOptions) {
        const filePath = `${process.env.NODE_ENV || 'development'}.env`;
        const envFile = path.resolve(__dirname, '../../', options.folder, filePath);
        this.envConfig = dotenv.parse(fs.readFileSync(envFile));
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}