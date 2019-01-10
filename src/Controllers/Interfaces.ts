import {Request, Response, Router} from 'express';

type ExpressRoute = (request: Request, response: Response) => void;

export interface IController {
  mapRoutes: (router: Router) => void;
}

export interface IResourceController extends IController {
  basepath: string;
  get: ExpressRoute;
  post: ExpressRoute;
  delete: ExpressRoute;
  all: ExpressRoute;
  update: ExpressRoute;
}
