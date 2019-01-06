import * as dotenv from 'dotenv';
import * as express from 'express';
import * as reactViews from 'express-react-views';
import { fallback } from './fallback';
import { routes } from './routes';

dotenv.config();

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

routes(app);

fallback(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000 !');
  
});
