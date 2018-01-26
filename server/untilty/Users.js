class Users {

    constructor(){
       this.users=[];
    }

    addUser(id,name,room){
        this.users.push({id,name,room});
        return this.users;
    }
    reomveUser(id) {

        var user= this.getUser(id);
        if(user){
            this.users= this.users.filter((user)=> user.id !== id)
        }
        return user;
    }
    getUser(id){
        return  this.users.filter((user) => user.id === id)[0];
    }
    getUserList(room){
        const users= this.users.filter((user) => user.room === room);
        const nameArray= users.map((user) => user.name);
        return nameArray;

    }
}
module.exports = { Users };