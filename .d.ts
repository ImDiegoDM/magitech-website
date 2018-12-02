declare namespace Express {
  export interface Response {
      send: (text:string)=>void;
  }
  export interface Request {
  }
  export interface Application {
    get: (route:string,handler:(req:Request,res:Response)=>void)=>void;
  }
}