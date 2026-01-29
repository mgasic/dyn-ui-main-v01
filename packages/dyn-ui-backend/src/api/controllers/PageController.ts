import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getPages = async (req: Request, res: Response) => {
    try {
        const pages = await prisma.page.findMany({
            where: { isActive: true },
            include: {
                _count: {
                    select: { components: true },
                },
            },
            orderBy: { name: 'asc' },
        });
        res.json(pages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch pages' });
    }
};

export const getPageById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const page = await prisma.page.findUnique({
            where: { id: Number(id) },
            include: {
                components: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!page) {
            return res.status(404).json({ error: 'Page not found' });
        }

        // Parse component configurations
        const parsedPage = {
            ...page,
            components: page.components.map(c => ({
                ...c,
                configuration: JSON.parse(c.configuration),
            })),
        };

        res.json(parsedPage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch page' });
    }
};

export const createPage = async (req: Request, res: Response) => {
    try {
        const { name, route, title } = req.body;
        const page = await prisma.page.create({
            data: { name, route, title },
        });
        res.status(201).json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create page' });
    }
};

export const updatePage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, route, title, isActive } = req.body;
        const page = await prisma.page.update({
            where: { id: Number(id) },
            data: { name, route, title, isActive },
        });
        res.json(page);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update page' });
    }
};
