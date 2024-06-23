import express, {Router} from 'express';
import * as taskController from '../controllers/taskController';

const tasksRouter: Router = express.Router();

tasksRouter.post('/getall', taskController.getAllTasks);
tasksRouter.get('/getone/:id', taskController.getTaskById);
tasksRouter.post('/create', taskController.createTask);
tasksRouter.put('/update/:id', taskController.updateTask);
tasksRouter.post('/remove/:id', taskController.deleteTask);

export default tasksRouter;
