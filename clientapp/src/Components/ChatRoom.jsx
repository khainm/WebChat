import React, { useEffect, useState } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';
import SendMessageForm from './SendMessageForm';
import MessageContainer from './MessageContainer';

function ChatRoom({ user }) {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl("http://localhost:5220/Chat") // Địa chỉ URL của backend
            .withAutomaticReconnect()
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => {
                    console.log('Connected!');
                   
                    connection.invoke('JoinSpecificChatRoom', { username: user.username, chatRoom: user.chatRoom });

                  
                    connection.on('ReceiveMessage', (username, message) => {
                        const newMessage = { username, message };
                        setMessages(messages => [...messages, newMessage]);
                    });

                   
                    connection.on('ReceiveSpecificMessage', (username, message) => {
                        const newMessage = { username, message };
                        setMessages(messages => [...messages, newMessage]);
                    });
                })
                .catch(e => console.log('Connection failed: ', e));
        }
    }, [connection, user]);

    const sendMessage = async (message) => {
        if (connection) {
            try {
                await connection.invoke('SendMessage', message); 
            } catch (e) {
                console.error('Error sending message: ', e);
            }
        }
    };

    return (
        <div className="chat-room p-3">
            <h2 className="text-center">Chat Room: {user.chatRoom}</h2>
            <MessageContainer messages={messages} />
            <SendMessageForm onSendMessage={sendMessage} />
        </div>
    );
}

export default ChatRoom;
