import { TypeCase } from '../interfaces/start-options.interface';
import * as Cerealizr from 'cerealizr';
import { NextFunction, Request, RequestHandler, Response, Send } from 'express';

const { CamelcaseSerializer, SnakecaseSerializer } = Cerealizr;

// Request/Response interceptor
export const typeCase = (typeCase: TypeCase): RequestHandler => {
  let serializer;

  switch (typeCase) {
    case 'camel':
      serializer = new CamelcaseSerializer();
      break;
    case 'snake':
      serializer = new SnakecaseSerializer();
      break;
    case false:
    default:
      serializer = null;
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const expressJson: Send = res.json;

    // Request
    if (serializer !== null) {
      req.query = serializer.serialize(req.query);
      req.params = serializer.serialize(req.params);
      req.body = serializer.serialize(req.body);
    }

    res.json = function(body): Response {
      const serializedBody =
        serializer !== null ? serializer.serialize(body) : body;

      return expressJson.call(this, serializedBody);
    };

    next();
  };
};
