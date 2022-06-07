import io from "socket.io-client";

const URL = "http://127.0.0.1:3001"
 
const socket = io(URL)

export { socket };