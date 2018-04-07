import test from 'ava';
import { reducerTest } from 'redux-ava';
import reportReducer, { getReport, getReports } from '../ReportReducer';
import { addReport, deleteReport, addReports } from '../ReportActions';

test(
  'action for ADD_REPORT is working',
  reducerTest(
    reportReducer,
    { data: ['foo'] },
    addReport({
      name: 'prank',
      title: 'first report',
      content: 'Hello world!',
      _id: null,
      cuid: null,
      slug: 'first-report'
    }),
    {
      data: [
        {
          name: 'prank',
          title: 'first report',
          content: 'Hello world!',
          _id: null,
          cuid: null,
          slug: 'first-report'
        },
        'foo'
      ]
    }
  )
);

test(
  'action for DELETE_REPORT is working',
  reducerTest(
    reportReducer,
    {
      data: [
        {
          name: 'prank',
          title: 'first report',
          content: 'Hello world!',
          cuid: 'abc',
          _id: 1,
          slug: 'first-report'
        }
      ]
    },
    deleteReport('abc'),
    { data: [] }
  )
);

test(
  'action for ADD_REPORTS is working',
  reducerTest(
    reportReducer,
    { data: [] },
    addReports([
      {
        name: 'prank',
        title: 'first report',
        content: 'Hello world!',
        _id: null,
        cuid: null,
        slug: 'first-report'
      }
    ]),
    {
      data: [
        {
          name: 'prank',
          title: 'first report',
          content: 'Hello world!',
          _id: null,
          cuid: null,
          slug: 'first-report'
        }
      ]
    }
  )
);

test('getReports selector', t => {
  t.deepEqual(
    getReports({
      reports: { data: ['foo'] }
    }),
    ['foo']
  );
});

test('getReport selector', t => {
  t.deepEqual(
    getReport(
      {
        reports: { data: [{ cuid: '123' }] }
      },
      '123'
    ),
    { cuid: '123' }
  );
});
