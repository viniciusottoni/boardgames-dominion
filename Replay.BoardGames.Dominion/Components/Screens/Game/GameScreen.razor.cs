using Microsoft.AspNetCore.Components;

namespace Replay.BoardGames.Dominion.Components.Screens.Game
{
    public partial class GameScreen : ComponentBase
    {
        [Parameter]
        public string RoomName { get; set; }
    }
}
