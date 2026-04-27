import { Router } from 'express';
import { createAdmissionLead, getAdmissionLeads, updateLeadStatus } from '../controllers/admission.controller';
import { validate } from '../middlewares/validate.middleware';
import { admissionLeadSchema, updateLeadStatusSchema } from '../utils/schemas';

const router = Router();

router.post('/', validate(admissionLeadSchema), createAdmissionLead);
router.get('/', getAdmissionLeads);
router.patch('/:id/status', validate(updateLeadStatusSchema), updateLeadStatus);

export default router;
