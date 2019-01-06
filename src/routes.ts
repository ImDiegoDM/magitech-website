import { Router } from 'express';
import { Application } from 'express-serve-static-core';
import * as controllers from './Controllers';
import { mapRoutes } from './utils/mapRoutes';

export function routes(app: Application) {
  const apiRouter = Router();

  mapRoutes(apiRouter, controllers);

  app.use('/v1/api', apiRouter);

  app.get('/', (req, res) => {
    res.render('index', { name: 'John' });
    
  });
}
