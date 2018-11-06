import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_REPORT = 'ADD_REPORT';
export const ADD_REPORTS = 'ADD_REPORTS';
export const DELETE_REPORT = 'DELETE_REPORT';

// Export Actions
export function addReport(report) {
  return {
    type: ADD_REPORT,
    report,
  };
}

export function addReportRequest(report) {
  return (dispatch) => {
    return callApi('reports', 'post', {
      report: {
        name: report.name,
        title: report.title,
        content: report.content,
      },
    }).then(res => dispatch(addReport(res.report)));
  };
}

export function addReports(reports) {
  return {
    type: ADD_REPORTS,
    reports,
  };
}

export function fetchReports() {
  return (dispatch) => {
    return callApi('reports').then(res => {
      dispatch(addReports(res.reports));
    });
  };
}

export function fetchReport(cuid) {
  return (dispatch) => {
    return callApi(`reports/${cuid}`).then(res => dispatch(addReport(res.report)));
  };
}

export function deleteReport(cuid) {
  return {
    type: DELETE_REPORT,
    cuid,
  };
}

export function deleteReportRequest(cuid) {
  return (dispatch) => {
    return callApi(`reports/${cuid}`, 'delete').then(() => dispatch(deleteReport(cuid)));
  };
}
