import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

// Import Components
import ReportList from '../../components/ReportList';
import ReportCreateWidget from '../../components/ReportCreateWidget/ReportCreateWidget';

// Import Actions
import { addReportRequest, fetchReports, deleteReportRequest } from '../../ReportActions';
import { toggleAddReport } from '../../../App/AppActions';

// Import Selectors
import { getShowAddReport } from '../../../App/AppReducer';
import { getReports } from '../../ReportReducer';

class ReportListPage extends Component {
  componentDidMount() {
    this.props.dispatch(fetchReports());
  }

  handleDeleteReport = report => {
    if (confirm('Do you want to delete this report')) { // eslint-disable-line
      this.props.dispatch(deleteReportRequest(report));
    }
  };

  handleAddReport = (name, title, content) => {
    this.props.dispatch(toggleAddReport());
    this.props.dispatch(addReportRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <ReportCreateWidget addReport={this.handleAddReport} showAddReport={this.props.showAddReport} />
        <ReportList handleDeleteReport={this.handleDeleteReport} reports={this.props.reports} />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
ReportListPage.need = [() => { return fetchReports(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    showAddReport: getShowAddReport(state),
    reports: getReports(state),
  };
}

ReportListPage.propTypes = {
  reports: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  showAddReport: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ReportListPage.contextTypes = {
  router: React.PropTypes.object,
};

export default connect(mapStateToProps)(ReportListPage);
