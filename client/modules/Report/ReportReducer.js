import { ADD_REPORT, ADD_REPORTS, DELETE_REPORT } from './ReportActions';

// Initial State
const initialState = { data: [] };

const ReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPORT :
      return {
        data: [action.report, ...state.data],
      };

    case ADD_REPORTS :
      return {
        data: action.reports,
      };

    case DELETE_REPORT :
      return {
        data: state.data.filter(report => report.cuid !== action.cuid),
      };

    default:
      return state;
  }
};

/* Selectors */

// Get all reports
export const getReports = state => state.reports.data;

// Get report by cuid
export const getReport = (state, cuid) => state.reports.data.filter(report => report.cuid === cuid)[0];

// Export Reducer
export default ReportReducer;
