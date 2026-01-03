import { Request, Response, NextFunction } from 'express';

export function headerValidationMiddleware(req: Request, res: Response, next: NextFunction) {
  if (!req.headers['x-api-key']) {
    return res.status(400).json({ error: 'Missing x-api-key header' });
  }
  next();
}
