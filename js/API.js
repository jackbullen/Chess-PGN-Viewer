async function getUserData(username) {
  const baseUrl = 'https://lichess.org/api/';

  // Get the user's profile
  const profileResponse = await fetch(`${baseUrl}user/${username}`);
  const profile = await profileResponse.json();

  // Get the user's rating history
  const historyResponse = await fetch(`${baseUrl}user/${username}/rating-history`);
  const history = await historyResponse.json();

  // Get the user's game data
  const gamesResponse = await fetch(`${baseUrl}games/user/${username}`);
  const games = await gamesResponse.json();

  return {
    username: profile.username,
    rating: profile.perfs.classical.rating,
    history: history.history,
    games: games.currentPageResults
  };
}
