import { useState } from 'react';
import ChatRoom from './Components/ChatRoom';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 

function App() {
    const [user, setUser] = useState(null);
    const [isInChatRoom, setIsInChatRoom] = useState(false);

    const handleLogin = (userData) => {
        setUser(userData);
        setIsInChatRoom(true);
    };

    return (
        <div className="d-flex vh-100 justify-content-center align-items-center">
            <div className="w-100" style={{ maxWidth: '3024px' }}>
                {!isInChatRoom ? (
                    <Login onLogin={handleLogin} />
                ) : (
                    <ChatRoom user={user} />
                )}
            </div>
        </div>
    );
}

export default App;
