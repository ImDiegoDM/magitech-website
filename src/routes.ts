import { Router } from 'express';
import { Application } from 'express-serve-static-core';
import { HomeController, UserResource } from './Controllers';
import { mapRoutes } from './utils/mapRoutes';

export function routes(app: Application) {
  const apiRouter = Router();
  const staticRouter = Router();

  mapRoutes(apiRouter, [
    new UserResource(),
  ]);

  mapRoutes(staticRouter, [
    new HomeController(),
  ]);

  app.use('/v1/api', apiRouter);

  app.use('/', staticRouter);
}
