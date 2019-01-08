import * as dotenv from 'dotenv';
import * as express from 'express';
import * as reactViews from 'express-react-views';
import * as path from 'path';
import { fallback } from './fallback';
import { routes } from './routes';

dotenv.config();

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactViews.createEngine());

app.use('/public', express.static(path.join(__dirname, 'public')));

routes(app);

fallback(app);

app.listen(3000, () => {
  console.log('Example app listening on port 3000 !');
  
});
