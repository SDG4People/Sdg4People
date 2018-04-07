import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import { FormattedMessage } from 'react-intl';
import { ReportCreateWidget } from '../../components/ReportCreateWidget/ReportCreateWidget';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const props = {
  addReport: () => {},
  showAddReport: true,
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ReportCreateWidget {...props} />
  );

  t.truthy(wrapper.hasClass('form'));
  t.truthy(wrapper.hasClass('appear'));
  t.truthy(wrapper.find('h2').first().containsMatchingElement(<FormattedMessage id="createNewReport" />));
  t.is(wrapper.find('input').length, 2);
  t.is(wrapper.find('textarea').length, 1);
});

test('hide when showAddReport is false', t => {
  const wrapper = mountWithIntl(
    <ReportCreateWidget {...props} />
  );

  wrapper.setProps({ showAddReport: false });
  t.falsy(wrapper.hasClass('appear'));
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <ReportCreateWidget {...props} />
  );

  t.is(wrapper.prop('addReport'), props.addReport);
  t.is(wrapper.prop('showAddReport'), props.showAddReport);
});

test('calls addReport', t => {
  const addReport = sinon.spy();
  const wrapper = mountWithIntl(
    <ReportCreateWidget addReport={addReport} showAddReport />
  );

  wrapper.ref('name').get(0).value = 'David';
  wrapper.ref('title').get(0).value = 'Some Title';
  wrapper.ref('content').get(0).value = 'Bla Bla Bla';

  wrapper.find('a').first().simulate('click');
  t.truthy(addReport.calledOnce);
  t.truthy(addReport.calledWith('David', 'Some Title', 'Bla Bla Bla'));
});

test('empty form doesn\'t call addReport', t => {
  const addReport = sinon.spy();
  const wrapper = mountWithIntl(
    <ReportCreateWidget addReport={addReport} showAddReport />
  );

  wrapper.find('a').first().simulate('click');
  t.falsy(addReport.called);
});
