import { Router } from 'express';
import { getPages, getPageById, createPage, updatePage } from '../controllers/PageController';

const router = Router();

router.get('/', getPages);
router.get('/:id', getPageById);
router.post('/', createPage);
router.put('/:id', updatePage);

export default router;
