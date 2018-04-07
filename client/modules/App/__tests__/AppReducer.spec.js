import test from 'ava';
import { reducerTest } from 'redux-ava';
import appReducer, { getShowAddReport } from '../AppReducer';
import { toggleAddReport } from '../AppActions';

test('action for TOGGLE_ADD_REPORT is working', reducerTest(
  appReducer,
  { showAddReport: false },
  toggleAddReport(),
  { showAddReport: true },
));

test('getShowAddReport selector', t => {
  t.is(getShowAddReport({
    app: { showAddReport: false },
  }), false);
});
