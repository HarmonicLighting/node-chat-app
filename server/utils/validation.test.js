const expect = require('expect');
const {isRealString} = require('./validation');

describe('isRealString',()=>{
  it('Should reject non-string values',()=>{
    const not_string = 23;
    const result = isRealString(not_string);
    expect(result).toBe(false);
  });
  it('Should reject string with only spaces',()=>{
    const spaces_string = '    ';
    const result = isRealString(spaces_string);
    expect(result).toBe(false);
  });
  it('Should allow string with non-space characters',()=>{
    const real_string = ' Hello ';
    const result = isRealString(real_string);
    expect(result).toBe(true);
  });
});
