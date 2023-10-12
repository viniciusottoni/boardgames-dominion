using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using Replay.BoardGames.Dominion.Services;

namespace Replay.BoardGames.Dominion.Components.Screens.Main
{
    public partial class MainScreen : ComponentBase
    {
        [Inject]
        private IJSRuntime JSRuntime { get; set; }

        [Inject]
        private NavigationManager NavigationManager { get; set; }

        [Inject]
        private GameStateService GameState { get; set; }

        private string PlayerName { get; set; }

        private async Task CreateRoom()
        {
            var roomName = await JSRuntime.InvokeAsync<string>("prompt", "Enter room name:");

            if (string.IsNullOrEmpty(roomName))
            {
                return;
            }

            var room = GameState.CreateRoom(roomName);
            await NavigateTo(room);
        }

        private async Task JoinRoom()
        {
            var roomName = await JSRuntime.InvokeAsync<string>("prompt", "Enter room name:");

            if (string.IsNullOrEmpty(roomName))
            {
                return;
            }

            var room = GameState.Rooms.FirstOrDefault(x => x.Name.Equals(roomName));
            if (room == null)
            {
                await JSRuntime.InvokeAsync<string>("alert", "The room does not exist!");
                return;
            }

            await NavigateTo(room);
        }

        private async Task NavigateTo(Entities.Room room)
        {
            var player = GameState.CreatePlayer(PlayerName);
            await room.AddPlayer(player);

            NavigationManager.NavigateTo($"/room/{room.Name}");
        }
    }
}
