"use strict"

/**
 * An asynchronous bootstrap function that runs before
 * your application gets started.
 *
 * This gives you an opportunity to set up your data model,
 * run jobs, or perform some special logic.
 *
 * See more details here: https://strapi.io/documentation/developer-docs/latest/concepts/configurations.html#bootstrap
 */

const { getUsersByUsernameAndRoom, createUser, findUserById } = require("./utils/database")

module.exports = () => {
    const io = require("socket.io")(strapi.server, {
        cors: {
            origin: "http://localhost:3000",
            methods: ["GET", "POST"],
            allowedHeaders: ["my-custom-header"],
            credentials: true,
        },
    })

    io.on("connection", (socket) => {
        socket.on("join", async ({ username, room }, callback) => {
            try {
                const users = await getUsersByUsernameAndRoom(username, room)

                if (users.length) {
                    throw new Error(`User ${username} already exists in room ${room}. Please select a different room.`)
                }
            } catch (e) {
                callback(`Error on findUser: ${e.message}`)
                return
            }

            let user = null
            try {
                user = await createUser({
                    username, room, status: "ONLINE", socketId: socket.id,
                })

                if (!user) {
                    throw new Error("User couldn't be created, please try again later.")
                }
            } catch (e) {
                callback(`Error on createUser: ${e.message}`)
                return
            }

            socket.join(user.room)
            socket.emit("welcome", {
                user: "bot",
                text: `${user.username}, Welcome to room ${user.room}`,
                userData: user,
            })
            socket.broadcast.to(user.room).emit("message", {
                user: "bot",
                text: `${user.username} has joined!`,
            })

            callback()
        })

        socket.on("sendMessage", async ({ userId, message }, callback) => {
            try {
                const user = await findUserById(userId)

                if (!user) {
                    throw new Error(`User doesn't exists in the database, please rejoin the chat.`)
                }

                io.to(user.room).emit("message", {
                    user: user.username,
                    text: message,
                })

                callback()
            } catch (e) {
                callback(`SendMessage handler failed: ${e.message}`)
            }
        })
    })
}
