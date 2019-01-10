import { Router } from 'express';
import { IController } from '../Controllers/Interfaces';

export function mapRoutes(router: Router, controller: IController[]) {
  for (const ctrl of controller) {
    if (ctrl) {
      ctrl.mapRoutes(router);
    }
  }
}
