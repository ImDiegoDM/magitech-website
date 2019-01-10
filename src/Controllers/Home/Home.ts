import { Router } from 'express';
import { highlights } from '../../Mocks/highlights';
import { IController } from '../Interfaces';

export class HomeController implements IController {
  public mapRoutes(router: Router) {
    router.get('/', (req, res) => {
      res.render('index', { name: 'John', highlights });
    });
  }
}
