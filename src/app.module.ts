import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PictureModule } from './pictures/picture.module';
import { PictureTagService } from './pictures/picture-tags/picture-tag.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PictureModule,
  ],
  providers: [PictureTagService],
})
export class AppModule { }
