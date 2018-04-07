// Import Actions
import { TOGGLE_ADD_REPORT } from './AppActions';

// Initial State
const initialState = {
  showAddReport: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_REPORT:
      return {
        showAddReport: !state.showAddReport,
      };

    default:
      return state;
  }
};

/* Selectors */

// Get showAddReport
export const getShowAddReport = state => state.app.showAddReport;

// Export Reducer
export default AppReducer;
