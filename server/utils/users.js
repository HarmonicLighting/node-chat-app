
class Users{
  constructor(){
    this.users = [];
  }

  addUser(id,name,room){
    var user = {id,name,room};
    this.users.push(user);
    return user;
  }

  removeUser(id){
    var user = this.users.filter((user)=>user.id === id);
    if (user.length < 1){
      return null;
    }else{
      var purgedUsers = this.users.filter((user)=>user.id != id);
      this.users = purgedUsers;
      return user[0];
    }
  }

  getUser(id){
    var user = this.users.filter((user)=>user.id === id);
    if (user.length < 1){
      return null;
    }else{
      return user[0];
    }
  }

  userNameExists(name){
    var user = this.users.filter((user)=>user.name == name);
    if (user.length < 1){
      return false;
    }else{
      return true;
    }
  }

  getUserList(room){
    var users = this.users.filter((user)=>user.room === room);
    var namesArray = users.map((user)=> user.name);

    return namesArray;
  }
}

module.exports = {Users};
