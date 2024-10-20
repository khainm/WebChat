import React, { useState } from 'react';

function Login({ onLogin }) {
    const [username, setUsername] = useState('');
    const [chatRoom, setChatRoom] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin({ username, chatRoom });
    };

    return (
        <form onSubmit={handleSubmit} className="border p-4 rounded shadow bg-light">
            <h2 className="text-center">Login</h2>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your name"
                    required
                />
            </div>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={chatRoom}
                    onChange={(e) => setChatRoom(e.target.value)}
                    placeholder="Enter chat room"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary btn-block">Join Chat</button>
        </form>
    );
}

export default Login;
