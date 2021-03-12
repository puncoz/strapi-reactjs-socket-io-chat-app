"use strict"

const getUsersByUsernameAndRoom = async (username, room) => await strapi.services.users.find({ username, room })

const findUserById = async (userId) => await strapi.services.users.findOne({ id: userId })

const createUser = async ({ username, room, status, socketId }) => await strapi.services.users.create({
    username,
    room,
    status,
    socketId,
})

const deleteUserBySocketId = async (socketId) => await strapi.services.users.delete({ socketId })

const getUsersInRoom = async (room) => await strapi.services.users.find({ room })

module.exports = {
    getUsersByUsernameAndRoom, createUser, findUserById, getUsersInRoom, deleteUserBySocketId,
}
