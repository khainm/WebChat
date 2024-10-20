import React from 'react';

function MessageContainer({ messages }) {
    return (
        <div className="message-container border p-3 rounded mb-3" style={{ maxHeight: '300px', overflowY: 'scroll' }}>
            <h3>Messages</h3>
            <ul className="list-unstyled">
                {messages.map((msg, index) => (
                    <li key={index} className="border-bottom py-2">
                        <strong>{msg.username}:</strong> {msg.message}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MessageContainer;
