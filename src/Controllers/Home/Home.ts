import { Router } from 'express';
import { about } from '../../Mocks/about';
import { projects } from '../../Mocks/projects';
import { portfolio } from '../../Mocks/protfolio';
import { whatWeDo } from '../../Mocks/what-we-do';
import { HelloProps } from '../../views';
import { IController } from '../Interfaces';

export class HomeController implements IController {
  public mapRoutes(router: Router) {
    router.get('/', (req, res) => {
      const indexContent: HelloProps = {
        projects,
        about,
        whatWeDo,
        portfolio,
      };

      res.render('index', indexContent);
    });
  }
}
