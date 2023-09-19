import express from 'express';
import { BookRouter } from '../modules/book/book.route';
import { CategoryRouter } from '../modules/category/category.route';
import { OrderRouter } from '../modules/order/order.route';
import { UserRouter } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRouter 
  },
  {
    path: '/categories',
    routes: CategoryRouter
  },
  {
    path: '/books',
    routes: BookRouter
  },
  {
    path: '/orders',
    routes: OrderRouter
  },

];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
