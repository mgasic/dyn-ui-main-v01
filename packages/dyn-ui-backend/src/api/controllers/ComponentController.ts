import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getComponents = async (req: Request, res: Response) => {
    try {
        const { pageId } = req.query;

        const where = pageId ? { pageId: Number(pageId) } : {};

        const components = await prisma.component.findMany({
            where: {
                ...where,
                isActive: true,
            },
            orderBy: {
                order: 'asc',
            },
        });

        // Parse configuration string to JSON
        const parsedComponents = components.map(c => ({
            ...c,
            configuration: JSON.parse(c.configuration),
        }));

        res.json(parsedComponents);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch components' });
    }
};

export const getComponentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const component = await prisma.component.findUnique({
            where: { id: Number(id) },
        });

        if (!component) {
            return res.status(404).json({ error: 'Component not found' });
        }

        res.json({
            ...component,
            configuration: JSON.parse(component.configuration),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch component' });
    }
};

export const createComponent = async (req: Request, res: Response) => {
    try {
        const { componentType, name, configuration, order, pageId } = req.body;

        const component = await prisma.component.create({
            data: {
                componentType,
                name,
                configuration: JSON.stringify(configuration),
                order: order || 0,
                pageId: pageId ? Number(pageId) : null,
            },
        });

        res.status(201).json({
            ...component,
            configuration: JSON.parse(component.configuration),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create component' });
    }
};

export const updateComponent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { componentType, name, configuration, order, isActive, pageId } = req.body;

        const component = await prisma.component.update({
            where: { id: Number(id) },
            data: {
                componentType,
                name,
                configuration: configuration ? JSON.stringify(configuration) : undefined,
                order,
                isActive,
                pageId,
            },
        });

        res.json({
            ...component,
            configuration: JSON.parse(component.configuration),
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update component' });
    }
};

export const deleteComponent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.component.delete({
            where: { id: Number(id) },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete component' });
    }
};
