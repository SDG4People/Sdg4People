import { Router } from 'express';
import * as ReportController from '../controllers/report.controller';
const router = new Router();

// Get all Reports
router.route('/reports').get(ReportController.getReports);

// Get one report by cuid
router.route('/reports/:cuid').get(ReportController.getReport);

// Add a new Report
router.route('/reports').post(ReportController.addReport);

// Delete a report by cuid
router.route('/reports/:cuid').delete(ReportController.deleteReport);

export default router;
