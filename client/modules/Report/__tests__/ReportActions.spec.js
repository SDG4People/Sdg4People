import test from 'ava';
import { actionTest } from 'redux-ava';

import {
  ADD_REPORT,
  DELETE_REPORT,
  ADD_REPORTS,
  addReport,
  deleteReport,
  addReports,
} from '../ReportActions';

const report = { name: 'Prashant', title: 'Hello Mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'", slug: 'hello-mern', _id: 1 };

test('should return the correct type for addReport', actionTest(
  addReport,
  report,
  { type: ADD_REPORT, report },
));

test('should return the correct type for deleteReport', actionTest(
  deleteReport,
  report.cuid,
  { type: DELETE_REPORT, cuid: report.cuid },
));

test('should return the correct type for addReports', actionTest(
  addReports,
  [report],
  { type: ADD_REPORTS, reports: [report] },
));
