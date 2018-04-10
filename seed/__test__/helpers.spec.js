const { expect } = require('chai')
const { filterOnlyEnglish } = require('../index')

describe('Seed helpers test', () => {
  it('should filter only English work correctly', () => {
    expect(filterOnlyEnglish('Hi jordan')).to.be.true
    expect(filterOnlyEnglish('เจมส์มา')).to.be.false
  })
})
