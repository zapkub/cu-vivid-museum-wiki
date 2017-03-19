const keystone = require('keystone');
const path = require('path');
const ReportLevelEnum = require('./enum/ReportLevelEnum');

const Types = keystone.Field.Types;

const ReportImageStorage = new keystone.Storage({
  adapter: keystone.Storage.Adapters.FS,
  fs: {
    path: path.join(__dirname, '../../static/images/report'),
    publicPath: '/static/images/report',
  },
});

const Report = new keystone.List('Report', {
  defaultSort: 'createdAt',
  map: { name: 'topic' },
});


Report.add({
  topic: { type: String, label: 'หัวข้อ' },
  targetURL: { type: String },
  description: { type: String },
  level: { type: Types.Select, options: ReportLevelEnum.enum },
  screenshot: { type: Types.File, storage: ReportImageStorage },
});

Report.defaultColumns = 'topic, description, level';
Report.register();
