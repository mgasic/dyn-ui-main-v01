import { Request, Response } from 'express';

// Mock data generator based on component type or ID
export const getComponentData = async (req: Request, res: Response) => {
    try {
        const { componentId } = req.params;

        // In a real app, this would query a dynamic table or external service
        // For now, we return mock data suitable for a Table or List

        // Mock data for ID 1 (e.g., Users Table)
        const mockData = Array.from({ length: 20 }).map((_, i) => ({
            id: i + 1,
            name: `Item ${i + 1} for Component ${componentId}`,
            status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
            date: new Date().toISOString(),
            value: Math.floor(Math.random() * 1000),
        }));

        res.json({
            data: mockData,
            total: 100,
            page: 1,
            pageSize: 20,
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch component data' });
    }
};

export const queryComponentData = async (req: Request, res: Response) => {
    try {
        const { componentId } = req.params;
        const { page, pageSize, sort } = req.body;

        res.json({
            data: [],
            message: "Query not implemented in mock",
            params: { componentId, page, pageSize, sort }
        });
    } catch (error) {
        res.status(500).json({ error: 'Query failed' });
    }
}
