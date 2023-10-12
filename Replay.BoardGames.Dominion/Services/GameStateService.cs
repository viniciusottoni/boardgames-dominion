namespace Replay.BoardGames.Dominion.Services
{
    using Replay.BoardGames.Dominion.Entities;
    using System.Collections.Generic;

    public class GameStateService
    {
        private List<Room> rooms = new();
        public IEnumerable<Room> Rooms { get { return rooms; } }

        public Room CreateRoom(string roomName)
        {
            var room = new Room
            {
                Id = Guid.NewGuid(),
                Name = roomName
            };
            rooms.Add(room);
            return room;
        }

        public Player CreatePlayer(string playerName)
        {
            return new Player
            {
                Id = Guid.NewGuid(),
                Name = playerName
            };
        }
    }
}
