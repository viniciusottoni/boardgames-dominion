using Microsoft.AspNetCore.SignalR;
using Replay.BoardGames.Dominion.Services;

namespace Replay.BoardGames.Dominion.Hubs
{
    public class GameHub : Hub
    {
        private readonly GameStateService _gameStateService;

        public GameHub(GameStateService gameStateService)
        {
            _gameStateService = gameStateService;
        }
    }
}
