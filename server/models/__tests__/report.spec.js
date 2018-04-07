import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Report from '../report';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial reports added into test db
const reports = [
  new Report({ name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" }),
  new Report({ name: 'Mayank', title: 'Hi Mern', slug: 'hi-mern', cuid: 'f34gb2bh24b24b3', content: "All dogs bark 'mern!'" }),
];

test.beforeEach('connect and add two report entries', t => {
  connectDB(t, () => {
    Report.create(reports, err => {
      if (err) t.fail('Unable to create reports');
    });
  });
});

test.afterEach.always(t => {
  dropDB(t);
});

test.serial('Should correctly give number of Reports', async t => {
  t.plan(2);

  const res = await request(app)
    .get('/api/reports')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.deepEqual(reports.length, res.body.reports.length);
});

test.serial('Should send correct data when queried against a cuid', async t => {
  t.plan(2);

  const report = new Report({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b5', content: 'Hello Mern says Foo' });
  report.save();

  const res = await request(app)
    .get('/api/reports/f34gb2bh24b24b5')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.report.name, report.name);
});

test.serial('Should correctly add a report', async t => {
  t.plan(2);

  const res = await request(app)
    .post('/api/reports')
    .send({ report: { name: 'Foo', title: 'bar', content: 'Hello Mern says Foo' } })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedReport = await Report.findOne({ title: 'bar' }).exec();
  t.is(savedReport.name, 'Foo');
});

test.serial('Should correctly delete a report', async t => {
  t.plan(2);

  const report = new Report({ name: 'Foo', title: 'bar', slug: 'bar', cuid: 'f34gb2bh24b24b5', content: 'Hello Mern says Foo' });
  report.save();

  const res = await request(app)
    .delete(`/api/reports/${report.cuid}`)
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const queriedReport = await Report.findOne({ cuid: report.cuid }).exec();
  t.is(queriedReport, null);
});

