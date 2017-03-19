import React from 'react';
import { compose, withState } from 'recompose';
import gql from 'graphql-tag';
import Router from 'next/router';
import { graphql } from 'react-apollo';
import { Form, Container, Header, Confirm, Select } from 'semantic-ui-react';

import withLoading from '../lib/withLoading';
import ReportTypeEnum from '../server/models/enum/ReportLevelEnum';

const reportMutation = gql`
    mutation ($topic: String!, $description: String!, $level: EnumReportLevel, $targetURL: String!) {
        createReport(record: {
            topic: $topic,
            description: $description,
            level: $level,
            targetURL: $targetURL
        }) {
            recordId
        }
    }
`;
export default compose(
  withState('showConfirmDialog', 'setShowConfirmDialog', false),
    withState('topic', 'setTopic', ''),
    withState('description', 'setDescription', ''),
    withState('targetURL', 'setTargetURL', ({ url }) => url.query.url ? decodeURIComponent(url.query.url) : ''),
    withState('level', 'setLevel', ReportTypeEnum.list[0].value),
    withState('loading', 'setLoading', false),
    withLoading(({ loading }) => loading),
    graphql(reportMutation, {
      props: ({ mutate, ownProps: { targetURL, setLoading } }) => ({
        submit: async () => {
          const response = await mutate();
          setLoading(true);
          if (response.data.createReport.recordId) {
            Router.router.push(`${targetURL}`);
          } else {
            alert('เกิดข้อผิดพลาดบางอย่าง');
          }

          setLoading(false);
        },
      }),
      options: ({ targetURL, topic, level, description }) => ({
        targetURL,
        topic,
        level,
        description,
      }),
    }),
)(({ submit, topic, showConfirmDialog, setShowConfirmDialog, setTopic, description, setDescription, targetURL, setTargetURL, level, setLevel }) => (
  <Container>
    <Confirm
      content="ยืนยันส่งรายงาน"
      onConfirm={submit}
      open={showConfirmDialog}
      onCancel={() => setShowConfirmDialog(false)}
    />
    <Header style={{ margin: 'auto', display: 'block', marginTop: 20 }} as="h2" icon>
      {'รายงานข้อมูลผิดพลาด และแก้ไข'}
      <Header.Subheader>
        {'ช่วยเราแก้ไขข้อมูลที่ผิดพลาดในฐานข้อมูล'}
      </Header.Subheader>
    </Header>
    <Form onSubmit={e => e.preventDefault()} style={{ maxWidth: 550, margin: 'auto', marginTop: 20 }}>
      <Form.Input label="หัวเรื่อง" name="topic" value={topic} onChange={e => setTopic(e.target.value)} />
      <Form.Input label="URL" name="url" value={targetURL} onChange={e => setTargetURL(e.target.value)} />
      <Form.TextArea label="รายละเอียด" name="url" value={description} onChange={e => setDescription(e.target.value)} />
      <Form.Field value={level} onChange={(e, selected) => setLevel(selected.value)} control={Select} label="ความสำคัญ" options={ReportTypeEnum.list} placeholder="Level" />
      <Form.Button onClick={() => setShowConfirmDialog(true)}>{'ส่งรายงาน'}</Form.Button>
    </Form>
  </Container>
  ));
