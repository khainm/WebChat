import React from 'react';

function WaitingRoom({ onJoin }) {
    return (
        <div>
            <h2>Waiting Room</h2>
            <button onClick={onJoin}>Join Chat</button>
        </div>
    );
}

export default WaitingRoom;

