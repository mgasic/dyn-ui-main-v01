import { Router } from 'express';
import { executeAction, getActionLogs } from '../controllers/ActionController';

const router = Router();

router.post('/execute', executeAction);
router.get('/logs', getActionLogs);

export default router;
