import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const executeAction = async (req: Request, res: Response) => {
    try {
        const { componentId, actionType, parameters } = req.body;

        // Log the action start
        const log = await prisma.actionLog.create({
            data: {
                componentId: Number(componentId),
                actionType,
                parameters: parameters ? JSON.stringify(parameters) : null,
            },
        });

        // Here you would typically have a service that handles specific action logic
        // For now, we'll just mock a successful execution
        const mockResult = { success: true, message: `Action ${actionType} executed` };

        // Update log with result
        await prisma.actionLog.update({
            where: { id: log.id },
            data: {
                result: JSON.stringify(mockResult),
            },
        });

        res.json({
            ...mockResult,
            logId: log.id,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to execute action' });
    }
};

export const getActionLogs = async (req: Request, res: Response) => {
    try {
        const { componentId } = req.query;
        const where = componentId ? { componentId: Number(componentId) } : {};

        const logs = await prisma.actionLog.findMany({
            where,
            orderBy: { createdAt: 'desc' },
            take: 100, // Limit to last 100 logs
        });

        const parsedLogs = logs.map(log => ({
            ...log,
            parameters: log.parameters ? JSON.parse(log.parameters) : null,
            result: log.result ? JSON.parse(log.result) : null,
        }));

        res.json(parsedLogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch action logs' });
    }
};
