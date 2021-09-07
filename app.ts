import { errorHandler } from './src/middlewares/error-handler';
import { corsHandler } from './src/middlewares/cors-handler'
import { typeCase } from './src/middlewares/type-case'
import Express, { Application } from 'express';
import userRouter from "./src/routes/user.route";

const app: Application = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json({ limit: '50mb' }));
app.use(corsHandler());
app.use(typeCase('snake'));
app.use("/user", userRouter)

app.use(errorHandler);

export default app;