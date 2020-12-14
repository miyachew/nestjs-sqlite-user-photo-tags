import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { PictureModule } from './pictures/picture.module';
import { PictureTagService } from './pictures/picture-tags/picture-tag.service';
import { PageMiddleware } from './middlewares/page.middleware';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    AuthModule,
    PictureModule,
  ],
  providers: [PictureTagService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PageMiddleware).forRoutes({
      path: 'pictures',
      method: RequestMethod.GET
    });
  }
}
