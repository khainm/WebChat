using System;
using Microsoft.AspNetCore.SignalR;
using System.Text.RegularExpressions;
using ChatBox.DataService;
using ChatBox.Models;

namespace ChatBox.Hubs
{
	
        public class ChatHub : Hub
        {
            private readonly ShareDb _share;
            public ChatHub(ShareDb share) => _share = share;

            public async Task JoinChat(UserConnection conn)
            {
                await Clients.All
                    .SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined");
            }

            public async Task JoinSpecificChatRoom(UserConnection conn)
            {
                // Add the user to the specified chat room group
                await Groups.AddToGroupAsync(Context.ConnectionId, conn.ChatRoom);
                _share.connections[Context.ConnectionId] = conn;

                // Notify the group that a new user has joined
                await Clients.Group(conn.ChatRoom).SendAsync("ReceiveMessage", "admin", $"{conn.Username} has joined {conn.ChatRoom}");
            }

            public async Task SendMessage(string msg)
            {
                // Get the user connection based on the current connection ID
                if (_share.connections.TryGetValue(Context.ConnectionId, out UserConnection conn))
                {
                    // Send the message only to the group the user belongs to
                    await Clients.Group(conn.ChatRoom)
                        .SendAsync("ReceiveSpecificMessage", conn.Username, msg); // Send username and message
                }
            }
        }
    }


