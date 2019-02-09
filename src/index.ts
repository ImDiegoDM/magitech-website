import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as path from 'path';
import { fallback } from './fallback';
import { routes } from './routes';

dotenv.config({path: '.dev.env'});

const app = express();

app.use('/public', express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routes(app);

fallback(app);

app.listen(process.env.PORT || 3000, () => {
  console.log('Example app listening on port 3000 !');
  
});
