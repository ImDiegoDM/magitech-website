import * as dotenv from 'dotenv';
import * as express from 'express';
import { routes } from './apiRoutes';
import { fallback } from './fallback';

dotenv.config();

const app = express();
routes(app);

fallback(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000 !');
});
