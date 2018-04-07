import React, { Component, PropTypes } from 'react';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './ReportCreateWidget.css';

export class ReportCreateWidget extends Component {
  addReport = () => {
    const nameRef = this.refs.name;
    const titleRef = this.refs.title;
    const contentRef = this.refs.content;
    if (nameRef.value && titleRef.value && contentRef.value) {
      this.props.addReport(nameRef.value, titleRef.value, contentRef.value);
      nameRef.value = titleRef.value = contentRef.value = '';
    }
  };

  render() {
    const cls = `${styles.form} ${(this.props.showAddReport ? styles.appear : '')}`;
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id="createNewReport" /></h2>
          <input placeholder={this.props.intl.messages.authorName} className={styles['form-field']} ref="name" />
          <input placeholder={this.props.intl.messages.reportTitle} className={styles['form-field']} ref="title" />
          <textarea placeholder={this.props.intl.messages.reportContent} className={styles['form-field']} ref="content" />
          <a className={styles['report-submit-button']} href="#" onClick={this.addReport}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

ReportCreateWidget.propTypes = {
  addReport: PropTypes.func.isRequired,
  showAddReport: PropTypes.bool.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ReportCreateWidget);
