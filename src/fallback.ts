import { Application, ErrorRequestHandler } from 'express';

export function fallback(app: Application) {
  app.use((req, res) => {
    res.status(404).send('404: Page not Found');
  });

  const error500: ErrorRequestHandler = (err, req, res, next) => {
    res.status(500).send('500: Internal Server Error');
  };

  // Handle 500
  app.use(error500);
}
