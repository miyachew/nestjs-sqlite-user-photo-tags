import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PictureModule } from './pictures/picture.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PictureModule,
  ],
  providers: [],
})
export class AppModule { }
