import Report from '../models/report';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';

/**
 * Get all reports
 * @param req
 * @param res
 * @returns void
 */
export function getReports(req, res) {
  Report.find().sort('-dateAdded').exec((err, reports) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ reports });
  });
}

/**
 * Save a report
 * @param req
 * @param res
 * @returns void
 */
export function addReport(req, res) {
  if (!req.body.report.name || !req.body.report.title || !req.body.report.content) {
    res.status(403).end();
  }

  const newReport = new Report(req.body.report);

  // Let's sanitize inputs
  newReport.title = sanitizeHtml(newReport.title);
  newReport.name = sanitizeHtml(newReport.name);
  newReport.content = sanitizeHtml(newReport.content);

  newReport.slug = slug(newReport.title.toLowerCase(), { lowercase: true });
  newReport.cuid = cuid();
  newReport.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ report: saved });
  });
}

/**
 * Get a single report
 * @param req
 * @param res
 * @returns void
 */
export function getReport(req, res) {
  Report.findOne({ cuid: req.params.cuid }).exec((err, report) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ report });
  });
}

/**
 * Delete a report
 * @param req
 * @param res
 * @returns void
 */
export function deleteReport(req, res) {
  Report.findOne({ cuid: req.params.cuid }).exec((err, report) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    }

    if (report) {
      report.remove(() => {
        res.status(200).end();
      });
    } else {
      res.status(404).send('Unable to find specified report.');
    }
  });
}
