import { Router } from 'express';
import { getComponentData, queryComponentData } from '../controllers/DataController';

const router = Router();

router.get('/:componentId', getComponentData);
router.post('/:componentId/query', queryComponentData);

export default router;
