const expect = require('expect');
const {Users} = require('./Users');
describe("Manipulate with class Users", () => {
       const users = new Users();
    beforeEach(() => {
        users.users = [{
            id: 5,
            name: "Kanga",
            room: "Friends room"
        },
        {
            id: 6,
            name: "Djenga",
            room: "Friends room"
        }
        ,
        {
            id: 7,
            name: "Holdy",
            room: "Friends room"
        }
        ];
    });
    it("Shoud generate correct user object in array", () => {

         const user ={
             id:5,
             name: "Kanga",
             room: "Friends room"
         }
        const userInstance = new Users();
        expect(userInstance.addUser(user.id, user.name, user.room)).toEqual([user]);


    })
    it("Shoud return list useres in Frineds room", () => {

        const userList =  users.getUserList("Friends room");
        const nameUsers = users.users.map((user)=> user.name);
        expect(userList).toEqual(nameUsers);


    })
    it("Should remove user", () => {
        const otherUsers= users.reomveUser(5);
         expect(otherUsers.id).toBe(5)
         expect(users.users.length).toBe(2)

    })
    it("Should not-remove user", () => {

        const otherUsers= users.getUser(55);
        expect(otherUsers).toEqual(undefined);
        expect(users.users.length).toBe(3)

    })
    it("Should find user", () => {
        const findedUser= users.getUser(5);
        expect(findedUser.id).toBe(5);
    })
    it("Should not-find user", () => {

        const findedUser= users.getUser(55);
         expect(findedUser).toEqual(undefined);
    })

});