
export function routes(app:Express.Application){
  app.get('/', function (req:Express.Request, res:Express.Response) {
    res.send('Hello test World!');
  });
}