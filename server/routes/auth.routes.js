import express from 'express';
import { signin, signup } from '../controllers/auth.controllers.js';

const routes = express();

routes.post('/auth/signup', signup);
routes.post('/auth/login', signin);

export default routes;
