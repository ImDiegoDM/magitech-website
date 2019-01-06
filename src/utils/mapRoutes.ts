import { Router } from 'express';
import { IResourceController } from '../Controllers/Interfaces';

interface IController {
  [index: string]: IResourceController;
}

export function mapRoutes(router: Router, controller: IController) {
  for (const key in controller) {
    if (controller[key]) {
      controller[key].mapRoutes(router);
    }
  }
}
