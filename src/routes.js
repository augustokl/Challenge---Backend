import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.get('/users/list', UserController.list);

routes.use(authMiddleware);

routes.post('/sessions', SessionController.store);
routes.post('/students', StudentController.store);

export default routes;
