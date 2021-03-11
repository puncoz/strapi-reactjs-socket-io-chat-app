"use strict"

const findUser = async (username, room) => await strapi.services.users.find({ username, room })

const createUser = async ({ username, room, status, socketId }) => await strapi.services.users.create({
    username,
    room,
    status,
    socketId,
})

module.exports = {
    findUser, createUser,
}
