using Microsoft.AspNetCore.Components;
using Replay.BoardGames.Dominion.Entities;
using Replay.BoardGames.Dominion.Services;

namespace Replay.BoardGames.Dominion.Components.Screens.Game
{
    public partial class PlayersList : ComponentBase, IDisposable
    {
        [Inject]
        private GameStateService GameState { get; set; }

        [Parameter]
        public string RoomName { get; set; }

        public IEnumerable<Player> Players
        {
            get
            {
                return GameState.Rooms.First(x => x.Name.Equals(RoomName)).Players;
            }
        }

        protected override void OnInitialized()
        {
            GameState.Rooms.First(x => x.Name.Equals(RoomName)).OnPlayerAdded += UpdatePlayers;
        }

        private async Task UpdatePlayers()
        {
            await InvokeAsync(() =>
            {
                StateHasChanged(); 
            });
        }

        public void Dispose()
        {
            GameState.Rooms.First(x => x.Name.Equals(RoomName)).OnPlayerAdded -= UpdatePlayers;
        }
    }
}
