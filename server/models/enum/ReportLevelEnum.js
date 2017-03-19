const list = [
  {
    key: 'CRITICAL',
    value: 'CRITICAL',
    text: 'สำคัญมาก',
  },
  {
    key: 'MAJOR',
    value: 'MAJOR',
    text: 'สำคัญ',
  },
  {
    key: 'MINOR',
    value: 'MINOR',
    text: 'เล็กน้อย',
  },
  {
    key: 'IMPROVEMENT',
    value: 'IMPROVEMENT',
    text: 'เพิ่มเติม รายละเอียด',
  },
];

module.exports = {
  enum: list.map(item => item.value),
  list,
};
