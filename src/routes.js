import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import { createUser, updateUser } from './app/middlewares/user';
import authMiddleware from './app/middlewares/auth';
import storeSessionMiddleware from './app/middlewares/session';

const routes = new Router();

/* FREE URLS */
routes.get('/', (req, res) => res.json({ ok: true }));
routes.post('/sessions', storeSessionMiddleware, SessionController.store);
routes.post('/users', createUser, UserController.store);

/* Rotas privadas */
routes.use(authMiddleware);
routes.put('/users', updateUser, UserController.update);

export default routes;
