import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router as countryRouter } from './routes/countryRoutes.js';
import { router as userRouter } from './routes/userRoutes.js';
import { PrismaClient } from './generated/prisma/index.js';

dotenv.config();
const PORT = process.env.PORT || 5000;
const prisma = new PrismaClient();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    methods: ['GET', 'POST'],
  })
);

// Middleware
app.use(express.json());

// Routes
app.use('/api/country', countryRouter);
app.use('/api/users', userRouter);

const server = app.listen(PORT, () =>
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`)
);

const shutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    // eslint-disable-next-line no-console
    console.log('Server closed.');
  });
};

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
