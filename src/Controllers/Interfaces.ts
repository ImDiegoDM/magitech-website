import {Request, Response, Router} from 'express';

type ExpressRoute = (request: Request, response: Response) => void;

export interface IResourceController {
  basepath: string;
  mapRoutes: (router: Router) => void;
  get: ExpressRoute;
  post: ExpressRoute;
  delete: ExpressRoute;
  all: ExpressRoute;
  update: ExpressRoute;
}
