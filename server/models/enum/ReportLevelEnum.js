const list = [
  {
    key: 'CRITICAL',
    value: 'critical',
    text: 'สำคัญมาก',
  },
  {
    key: 'MAJOR',
    value: 'major',
    text: 'สำคัญ',
  },
  {
    key: 'MINOR',
    value: 'minor',
    text: 'เล็กน้อย',
  },
  {
    key: 'IMPROVEMENT',
    value: 'improvement',
    text: 'เพิ่มเติม รายละเอียด',
  },
];

module.exports = {
  enum: list.map(item => item.key),
  list,
};
