import { Router } from 'express';
import { IResourceController } from './Controllers/Interfaces';

interface IController {
  [index: string]: IResourceController;
}

export function mapRoutes(router: Router, controller: IController) {
  for (const key in controller) {
    if (controller[key]) {
      const baseUrl = `/${key.toLowerCase()}`;
      router.get(baseUrl, (req, res) => {
        controller[key].all(req, res);
      });
    }
  }
}
