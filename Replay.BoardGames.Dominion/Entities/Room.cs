namespace Replay.BoardGames.Dominion.Entities
{
    public class Room
    {
        private List<Player> players = new();

        public Guid Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<Player> Players { get { return players; } }

        public event Func<Task> OnPlayerAdded;

        public async Task AddPlayer(Player player)
        {
            players.Add(player);

            if (OnPlayerAdded != null) await OnPlayerAdded.Invoke();
        }
    }
}
