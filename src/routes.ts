import { Router } from 'express';
import { Application } from 'express-serve-static-core';
import { HomeController, MailController, UserResource } from './Controllers';
import { mapRoutes } from './utils/mapRoutes';

export function routes(app: Application) {
  const apiRouter = Router();
  const staticRouter = Router();

  mapRoutes(apiRouter, [
    new UserResource(),
    new MailController(),
  ]);

  mapRoutes(staticRouter, [
    new HomeController(),
  ]);

  app.use('/api/v1', apiRouter);

  app.use('/', staticRouter);
}
