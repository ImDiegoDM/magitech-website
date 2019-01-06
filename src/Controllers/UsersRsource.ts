import {Request, Response, Router} from 'express';
import { IResourceController } from './Interfaces';

class UserResource implements IResourceController {
  public basepath = 'users';

  public mapRoutes(router: Router) {
    // to do
  }

  public get( request: Request, response: Response) {
    // Implement get method
  }

  public post(request: Request, response: Response) {
    // Implement post method
  }

  public delete(request: Request, response: Response) {
    // Implement delet method
  }

  public all(request: Request, response: Response) {
    response.send('work');
  }

  public update(request: Request, response: Response) {
    // Implement update method
  }
}

export const Users = new UserResource();
