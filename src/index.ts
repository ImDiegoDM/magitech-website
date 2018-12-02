import * as express from 'express';
import {routes} from './routes';

const app = express();

routes(app);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});