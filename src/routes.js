import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.use((req, res, next) => {
  console.log(`${req.method} - ${req.url}`);

  next();
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.post('/students', StudentController.store);
routes.put('/students', StudentController.update);

routes.get('/plan', PlanController.index);
routes.post('/plan', PlanController.store);
routes.put('/plan', PlanController.update);
routes.delete('/plan', PlanController.delete);

export default routes;
