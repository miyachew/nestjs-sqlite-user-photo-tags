import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

const LIMIT_DEFAULT_LIMITATION = '10';
const OFFSET_DEFAULT_LIMITATION = '0';

@Injectable()
export class PageMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    let { limit, offset } = req.query;
    limit = limit ?? LIMIT_DEFAULT_LIMITATION;
    offset = offset ?? OFFSET_DEFAULT_LIMITATION;

    req.query.limit = limit;
    req.query.offset = offset;

    next();
  }
}
