import React from 'react';
import { compose, withState } from 'recompose';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import { Form, Container, Header, Icon, Select } from 'semantic-ui-react';

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
    withState('topic', 'setTopic', ''),
    withState('description', 'setDescription', ''),
    withState('targetURL', 'setTargetURL', ''),
    withState('level', 'setLevel', ReportTypeEnum.list[0].key),
    graphql(reportMutation, {
      options: ({}) => ({

      }),
    }),
)(({ topic, setTopic, description, setDescription, targetURL, setTargetURL, level, setLevel }) => (
  <Container>
    <Header style={{ margin: 'auto', display: 'block', marginTop: 20 }} as="h2" icon>
      <Icon name="users" />
      {'Report and Improvement'}
      <Header.Subheader>
        {'Help us to fix an error and improve data accuracy.'}
      </Header.Subheader>
    </Header>
    <Form style={{ maxWidth: 550, margin: 'auto', marginTop: 20 }}>
      <Form.Input label="หัวเรื่อง" name="topic" value={topic} onChange={setTopic} />
      <Form.Input label="URL" name="url" value={targetURL} onChange={setTargetURL} />
      <Form.TextArea label="รายละเอียด" name="url" value={description} onChange={setDescription} />
      <Form.Field control={Select} label="Level" options={ReportTypeEnum.list} placeholder="Level" />
    </Form>
  </Container>
  ));
