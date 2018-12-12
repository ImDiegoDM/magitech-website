import {Request, Response} from 'express';

type ExpressRoute = (request: Request, response: Response) => void;

export interface IResourceController {
  get: ExpressRoute;
  post: ExpressRoute;
  delete: ExpressRoute;
  all: ExpressRoute;
  update: ExpressRoute;
}
