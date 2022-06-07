import React from 'react'
import { useEffect, useState } from 'react';


const Painel = ({socket, messages, setMessages}) =>{
    useEffect(()=>{
        socket.on('previousMessage', (messages)=>{
            console.log("previous")
            console.log(messages)
            setMessages([...messages])
        })
        socket.on('receiveMessage', (msg)=>{
            console.log("EXECUTEI N VEZES")
            setMessages((messages) => {
                console.log(messages)
                return [...messages, msg]
            })
        })

        return () => {
            socket.off('previousMessage')
            socket.off('receiveMessage')
        }
            
    }, [])
    
    return (
        <div>
            {messages.map(message =>{
                
                return (
                <div key={message.author}>
                    <span><strong>Author</strong>: {message.author}</span>
                    <span><strong>Message</strong>: {message.message}</span>
                </div>)
            })}
        </div>
    )
}

export default Painel;