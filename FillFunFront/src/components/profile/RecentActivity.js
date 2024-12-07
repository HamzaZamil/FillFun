const RecentActivity = ({ gameHistory }) => (
    <div className="col-md-9">
      <div className="card">
        <div className="card-header bg-dark text-white text-center">
          <h5 className="mb-0">Recent Activity</h5>
        </div>
        <div className="card-body">
          {gameHistory.length > 0 ? (
            <ul className="list-group">
              {gameHistory.map((game) => (
                <li key={game.id} className="list-group-item">
                  <strong>Game:</strong> {game.board.name} - <strong>Score:</strong> {game.score}
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activity found.</p>
          )}
        </div>
      </div>
    </div>
  );

  export default RecentActivity;