import React from 'react';
import test from 'ava';
import sinon from 'sinon';
import ReportListItem from '../../components/ReportListItem/ReportListItem';
import { mountWithIntl, shallowWithIntl } from '../../../../util/react-intl-test-helper';

const report = { name: 'Prashant', title: 'Hello Mern', slug: 'hello-mern', cuid: 'f34gb2bh24b24b2', content: "All cats meow 'mern!'" };
const props = {
  report,
  onDelete: () => {},
};

test('renders properly', t => {
  const wrapper = shallowWithIntl(
    <ReportListItem {...props} />
  );

  t.truthy(wrapper.hasClass('single-report'));
  t.is(wrapper.find('Link').first().prop('children'), report.title);
  t.regex(wrapper.find('.author-name').first().text(), new RegExp(report.name));
  t.is(wrapper.find('.report-desc').first().text(), report.content);
});

test('has correct props', t => {
  const wrapper = mountWithIntl(
    <ReportListItem {...props} />
  );

  t.deepEqual(wrapper.prop('report'), props.report);
  t.is(wrapper.prop('onClick'), props.onClick);
  t.is(wrapper.prop('onDelete'), props.onDelete);
});

test('calls onDelete', t => {
  const onDelete = sinon.spy();
  const wrapper = shallowWithIntl(
    <ReportListItem report={report} onDelete={onDelete} />
  );

  wrapper.find('.report-action > a').first().simulate('click');
  t.truthy(onDelete.calledOnce);
});
