import express from 'express';
import path from 'path';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import schema from './data/schema';
// import StroeDataController from './controllers/StroeDataController';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// StroeDataController.init();
// setInterval(() => {
//   StroeDataController.initStoreDataTable();
//   StroeDataController.initStoresTable();
// }, 1000 * 60 * 60 * 1);
// StroeDataController.getWeeklyDataByStoreNo();

/*
 * setting cors
 */
const whitelist = [
  'http://0.0.0.0:4000',
  'http://0.0.0.0:4001',
  'http://0.0.0.0:4002',
  'http://0.0.0.0:4003',
  'http://0.0.0.0:4005',
  'http://localhost:3000',
  'http://localhost:3001',
  'http://localhost:4000',
  'http://localhost:4001',
  'http://localhost:4002',
  'http://localhost:4003',
  'http://localhost:4005',
  'http://0.0.0.0:5000',
  'http://localhost:5000',
  // 'http://smart.dominos.com.cn',
  // 'http://smart-test.dominos.com.cn'
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      origin = 'http://localhost:4000';
    }
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
app.use(cors(corsOptions));
app.use('/', indexRouter);
/*
 * Setting GraphQL
 */
const server = new ApolloServer(schema);

server.applyMiddleware({ app });
app.listen({ port: 3001 }, () => console.log(`🚀 Server ready at http://localhost:3001${server.graphqlPath}`));

/*
 * catch 404 and forward to error handler
 */
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*
 * error handler
 */
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

export default app;
