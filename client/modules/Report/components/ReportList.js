import React, { PropTypes } from 'react';

// Import Components
import ReportListItem from './ReportListItem/ReportListItem';

function ReportList(props) {
  return (
    <div className="listView">
      {
        props.reports.map(report => (
          <ReportListItem
            report={report}
            key={report.cuid}
            onDelete={() => props.handleDeleteReport(report.cuid)}
          />
        ))
      }
    </div>
  );
}

ReportList.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteReport: PropTypes.func.isRequired,
};

export default ReportList;
