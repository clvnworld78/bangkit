const generateID = (username) => {
    const timeStamp = new Date().getTime();
    const id = `${username}${timeStamp}`;
    return id;
}

module.exports = generateID;