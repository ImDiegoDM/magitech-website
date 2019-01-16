import { NextFunction, Request, Response} from 'express';
import { isEmpty } from './isEmpty';

export interface CheckRules {
  [key: string]: (param: string, body: any) => string|undefined;
}

const checkRules: CheckRules = {
  required: (param: string, body: any) => {
    if (body[param] === undefined) {
      return `this parameter is required`;
    }
    return undefined;
  },
};

export interface IRules {
  [key: string]: string;
}

export function validate(rules: IRules) {

  return (req: Request, response: Response, next: NextFunction) => {
    const body = req.body;
    const validationsErrors: any = {};
    for (const key in rules) {
      if (rules.hasOwnProperty(key)) {
        const itemRules = rules[key].split('|');
        for (const r of itemRules) {
          const checked = checkRules[r](key, body);
          if (checked !== undefined) {
            if (!validationsErrors[key]) {
              validationsErrors[key] = [];
            }
            validationsErrors[key].push(checked);
          }
        }
      }
    }


    if (!isEmpty(validationsErrors)) {
      response.status(422).send({errors: validationsErrors});
      return;
    }

    next();
  };
}
