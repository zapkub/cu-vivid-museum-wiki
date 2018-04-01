const { expect } = require('chai')
const { scientificSplit } = require('../common')

describe('Common helper test', () => {
  const scientificNames = [
    'Abelmoschus moschatus Medik',
    'Acacia auriculaeformis ACunn.ex Benth.',
    'Acanthus ebracteatus Vahl',
    'Acacia senegal (L) Willdenow'
  ]

  const expectScientificNames = [
    'Abelmoschus moschatus',
    'Acacia auriculaeformis',
    'Acanthus ebracteatus',
    'Acacia senegal'
  ]
  it('should split scientific name correctly', () => {
    scientificNames.forEach((name, i) => expect(scientificSplit(name)).to.be.string(expectScientificNames[i]))
  })
})
