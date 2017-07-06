var expect = require('expect');
var {generateMessage} = require('./message');

describe('generateMessage',()=>{
  it('Should generate correct message object',()=>{
    const from = 'An ordinary user';
    const text = 'This is an ordinary text';
    const message = generateMessage(from,text);
    
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});
