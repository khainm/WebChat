import React, { useState } from 'react';

function SendMessageForm({ onSendMessage }) {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSendMessage(message); // Gọi hàm gửi tin nhắn
        setMessage(''); // Xóa nội dung input sau khi gửi
    };

    return (
        <form onSubmit={handleSubmit} className="d-flex">
            <input
                type="text"
                className="form-control"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                required
            />
            <button type="submit" className="btn btn-primary ml-2">Send</button>
        </form>
    );
}

export default SendMessageForm;
