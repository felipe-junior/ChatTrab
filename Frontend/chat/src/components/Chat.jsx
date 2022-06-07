import React, { useRef, useState } from 'react'
import io from "socket.io-client";

const Chat = ({socket, setMessages}) =>{

    const [data, setData] = useState({message: "", author: ""})
    
    const onChange = (e) => {
        const name = e.currentTarget.name 
        const value = e.currentTarget.value
        setData((prevState)=>{
            prevState[name] = value
            return {...prevState}
        })
    }


    const onSubmit = (e)=>{
        e.preventDefault()
        socket.emit('sendMessage', data)
        setMessages(messages => [...messages, data])
        setData({message: "", author: ""})
    }

    return (
        <div>
            <h2>Chat</h2>

            <form id="chat" onSubmit={onSubmit}>
                
                <label htmlFor="author">Author</label>
                <input type="text" id='author' name='author' onChange={onChange} value={data.author}/>

                <label htmlFor="message"> Message </label>
                <input type="text" id='message' name='message'
                    onChange={onChange} value={data.message}
                />
                
                <button type='submit'>Send</button>
            </form>
        </div>
    )
}

export default Chat;