import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../lib/db';

// Sign up
export const signup = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  if (!email || !password || !name) {
    const errors: string[] = [];
    if (!email) errors.push("Email is not present");
    if (!password) errors.push("Password is not present");
    if (!name) errors.push("Name is not present");

    res.status(400).json({ errors });
    return;
  }

  try {
    const existingUser = await db.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      res.status(400).json({ error: 'User with this email already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'Signup successful', userId: newUser.id });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(404).json({ error: 'Email is not valid, Please signup' });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: 'Password or Email is Incorrect' });
      return;
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Logout
export const logOut = (req: Request, res: Response): void => {
  res.status(200).json({ message: 'Logged out' });
};

// Delete user
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.body;

  if (!userId) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  try {
    await db.user.delete({
      where: { id: userId },
    });

    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
