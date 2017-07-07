const expect = require('expect');

const {Users} = require('./users');

describe('Users',()=>{

  var users;

  beforeEach(()=>{
    users = new Users();
    users.users = [{
      id:'1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id:'2',
      name: 'Jenn',
      room: 'React Course'
    },{
      id:'3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('Should add new user',()=>{
    var users = new Users();
    var user = {
      id: 123,
      name: 'Mich',
      room: 'A room'
    };
    var resUser = users.addUser(user.id,user.name,user.room);

    expect(users.users).toEqual([user]);
  });

  it('Should remove an user',()=>{
    const nUsers = users.users.length;
    const user = users.removeUser('1');
    expect(user).toNotBe(null);
    expect(user.name).toBe('Mike');
    expect(user.room).toBe('Node Course');
    expect(users.users.length).toBe(nUsers-1);
  });

  it('Should not remove an user',()=>{
    const nUsers = users.users.length;
    const user = users.removeUser('10');
    expect(user).toBe(null);
    expect(users.users.length).toBe(nUsers);
  });

  it('Should get an user',()=>{
    const nUsers = users.users.length;
    const user = users.getUser('1');
    expect(user).toNotBe(null);
    expect(user.name).toBe('Mike');
    expect(user.room).toBe('Node Course');
    expect(users.users.length).toBe(nUsers);
  });

  it('Should not get an user',()=>{
    const nUsers = users.users.length;
    const user = users.getUser('10');
    expect(user).toBe(null);
    expect(users.users.length).toBe(nUsers);
  });

  it('Should find an user by name',()=>{
    const nUsers = users.users.length;
    const found = users.userNameExists('Mike');
    expect(found).toBe(true);
    expect(users.users.length).toBe(nUsers);
  });

  it('Should not find an user by name',()=>{
    const nUsers = users.users.length;
    const found = users.userNameExists('Someone');
    expect(found).toBe(false);
    expect(users.users.length).toBe(nUsers);
  });

  it('Should return names for node course', ()=>{
    var userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike','Julie']);
  });
});
