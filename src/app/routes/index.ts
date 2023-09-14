import express from 'express';
import { CategoryRouter } from '../modules/category/category.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: UserRouter 
  },
  {
    path: '/categories',
    routes: CategoryRouter
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
