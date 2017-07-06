var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateMessage',()=>{
  it('Should generate correct location message object',()=>{
    const from = 'An ordinary user';
    const latitude = 100;
    const longitude = -100;
    const message = generateLocationMessage(from,latitude,longitude);

    expect(message.from).toBe(from);
    expect(message.url).toBe(`https://www.google.com/maps?q=${latitude},${longitude}`);
    expect(message.createdAt).toBeA('number');
  });
});
