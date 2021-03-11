import { io } from "socket.io-client"

const strapiEndpoint = process.env.REACT_APP_SERVER_URL

console.log(strapiEndpoint)
export const socket = io(strapiEndpoint)
