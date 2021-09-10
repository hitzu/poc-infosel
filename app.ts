import { corsHandler } from './src/middlewares/cors-handler';
import { typeCase } from './src/middlewares/type-case';
import requestIp from 'request-ip';
import Express, { Application } from 'express';
import userRouter from './src/routes/user.route';
import loginRouter from './src/routes/login.route';
import transactionRouter from './src/routes/transactions.route';
import { errorHandler } from './src/middlewares/error-handler';

const app: Application = Express();

app.use(Express.urlencoded({ extended: true }));
app.use(Express.json({ limit: '50mb' }));
app.use(corsHandler());
app.use(typeCase('camel'));
app.use(requestIp.mw());
app.use('/auth', loginRouter);
app.use('/user', userRouter);
app.use('/transaction', transactionRouter);

app.use(errorHandler);

module.exports = app;
