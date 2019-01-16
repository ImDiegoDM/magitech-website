import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as reactViews from 'express-react-views';
import * as path from 'path';
import { fallback } from './fallback';
import { routes } from './routes';

dotenv.config({path: '.dev.env'});

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

app.use('/public', express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

routes(app);

fallback(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000 !');
  
});
