import test from 'ava';
import { actionTest } from 'redux-ava';
import { TOGGLE_ADD_REPORT, toggleAddReport } from '../AppActions';

test('should return the correct type for toggleAddReport', actionTest(toggleAddReport, null, { type: TOGGLE_ADD_REPORT }));
