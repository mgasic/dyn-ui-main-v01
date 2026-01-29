import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import componentRoutes from './api/routes/components.routes';
import pageRoutes from './api/routes/pages.routes';
import actionRoutes from './api/routes/actions.routes';
import dataRoutes from './api/routes/data.routes';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3001;
const prisma = new PrismaClient();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/api/components', componentRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/actions', actionRoutes);
app.use('/api/data', dataRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('DynUI Backend API is running');
});

// Health check
app.get('/health', async (req: Request, res: Response) => {
    try {
        await prisma.$queryRaw`SELECT 1`;
        res.json({ status: 'ok', database: 'connected' });
    } catch (error) {
        res.status(500).json({ status: 'error', database: 'disconnected', error });
    }
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
