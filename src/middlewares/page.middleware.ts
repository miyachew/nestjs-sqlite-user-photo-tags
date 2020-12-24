import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

const LIMIT_DEFAULT_LIMITATION = '10';
const OFFSET_DEFAULT_LIMITATION = '0';

@Injectable()
export class PageMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: Function) {
    let { limit, offset }: any = req.query;
    limit = limit ?? LIMIT_DEFAULT_LIMITATION;
    offset = offset ?? OFFSET_DEFAULT_LIMITATION;

    if (isNaN(limit) || parseInt(limit) !== +limit) {
      limit = LIMIT_DEFAULT_LIMITATION;
    }
    if (isNaN(offset) || parseInt(offset) !== +offset) {
      offset = OFFSET_DEFAULT_LIMITATION;
    }

    limit = +limit;
    offset = +offset;
    req.query = {
      limit, offset
    }
    next();
  }
}
