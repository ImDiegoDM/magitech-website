import { Router } from 'express';
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { about } from '../../Mocks/about';
import { contact } from '../../Mocks/contact';
import { projects } from '../../Mocks/projects';
import { portfolio } from '../../Mocks/protfolio';
import { whatWeDo } from '../../Mocks/what-we-do';
import { renderHtml } from '../../utils/renderHtml';
import { HelloProps } from '../../views';
import Index from '../../views/index';
import { IController } from '../Interfaces';

export class HomeController implements IController {
  public mapRoutes(router: Router) {
    router.get('/', (req, res) => {
      const html = renderHtml(
        <Index projects={projects}
          about={about}
          whatWeDo={whatWeDo}
          portfolio={portfolio}
          contact={contact}/>,
      );

      res.send(html);
    });
  }
}
