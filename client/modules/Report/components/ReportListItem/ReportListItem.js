import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './ReportListItem.css';

function ReportListItem(props) {
  return (
    <div className={styles['single-report']}>
      <h3 className={styles['report-title']}>
        <Link to={`/reports/${props.report.slug}-${props.report.cuid}`} >
          {props.report.title}
        </Link>
      </h3>
      <p className={styles['author-name']}><FormattedMessage id="by" /> {props.report.name}</p>
      <p className={styles['report-desc']}>{props.report.content}</p>
      <p className={styles['report-action']}><a href="#" onClick={props.onDelete}><FormattedMessage id="deleteReport" /></a></p>
      <hr className={styles.divider} />
    </div>
  );
}

ReportListItem.propTypes = {
  report: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ReportListItem;
