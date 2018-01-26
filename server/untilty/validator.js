const isRealString = (str) => {

    return typeof str === 'string' && str.trim().length > 0
};

const doesUserNameExists = (users, name) => {

    const user = users.filter((user) => user=== name)
    return user === undefined || user.length > 0
};

module.exports = {isRealString, doesUserNameExists}