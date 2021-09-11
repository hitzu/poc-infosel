import { swLoginRouter } from './src/routes/login.route';
import { swUserRouter } from './src/routes/user.route';

export const swDocument = {
  openapi: '3.0.0',
  info: {
    title: 'POC infosel',
    version: '1.0.0',
    description: 'The REST API to infosel'
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server'
    }
  ],
  paths: {
    ...swUserRouter,
    ...swLoginRouter
  }
};
