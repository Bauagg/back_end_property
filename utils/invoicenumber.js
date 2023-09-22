module.exports = (userId) => {
    return `${userId.split(0, 3)}/${new Date().valueOf()}`
}