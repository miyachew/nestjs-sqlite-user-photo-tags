import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PictureModule } from './pictures/picture.module';
import { TagModule } from './tag/tag.module';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PictureModule,
    TagModule,
  ],
  providers: [],
})
export class AppModule { }
