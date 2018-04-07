import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from '../../components/ReportListItem/ReportListItem.css';

// Import Actions
import { fetchReport } from '../../ReportActions';

// Import Selectors
import { getReport } from '../../ReportReducer';

export function ReportDetailPage(props) {
  return (
    <div>
      <Helmet title={props.report.title} />
      <div className={`${styles['single-report']} ${styles['report-detail']}`}>
        <h3 className={styles['report-title']}>{props.report.title}</h3>
        <p className={styles['author-name']}><FormattedMessage id="by" /> {props.report.name}</p>
        <p className={styles['report-desc']}>{props.report.content}</p>
      </div>
    </div>
  );
}

// Actions required to provide data for this component to render in server side.
ReportDetailPage.need = [params => {
  return fetchReport(params.cuid);
}];

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    report: getReport(state, props.params.cuid),
  };
}

ReportDetailPage.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(ReportDetailPage);
