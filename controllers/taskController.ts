import { Request, Response } from 'express';
import { db } from '../lib/db';

// Get all tasks for the user
export const getAllTasks = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const tasks = await db.task.findMany({ where: { authorId: userId } });
    res.status(200).json(tasks);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Get a task by ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const taskId = req.params.id;
  try {
    const task = await db.task.findUnique({
      where: { id: taskId, authorId: userId },
    });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    res.status(200).json(task);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};

// Define TaskInput type
interface TaskInput {
  title: string;
  description: string;
  dueDate: Date; 
}

// Create a new task
export const createTask = async (req: Request, res: Response): Promise<void> => {
  const { userId, title, description, dueDate }: TaskInput & { userId: string } = req.body;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    const newTask = await db.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),  // Ensure dueDate is a Date object
        authorId: userId,
      },
    });
    res.status(201).json({newTask});
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Bad request' });
  }
};

// Update a task by ID
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { userId, title, description, dueDate }: TaskInput & { userId: string } = req.body;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const taskId = req.params.id;
  try {
    const task = await db.task.findUnique({
      where: { id: taskId, authorId: userId },
    });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    const updatedTask = await db.task.update({
      where: { id: taskId },
      data: {
        title,
        description,
        dueDate: new Date(dueDate),  // Ensure dueDate is a Date object
      },
    });
    res.status(200).json(updatedTask);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Bad request' });
  }
};


// Delete a task by ID
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;
  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  const taskId = req.params.id;
  try {
    const task = await db.task.findUnique({
      where: { id: taskId, authorId: userId },
    });
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }

    await db.task.delete({
      where: { id: taskId },
    });
    res.status(200).json({ message: 'Task deleted' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Internal server error' });
  }
};
