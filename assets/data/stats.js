import { gamesStorage } from "../data/games-storage.js";

export const stats = {
  totalGames() {
    return gamesStorage.load().length;
  },

  totalSpent() {
    return gamesStorage
      .load()
      .reduce((sum, game) => sum + Number(game.price || 0), 0);
  },

  completedGames() {
    return gamesStorage.load().filter((game) => game.status === "Completed")
      .length;
  },

  currentlyPlaying() {
    return gamesStorage.load().filter((game) => game.status === "Playing")
      .length;
  },

  backlogGames() {
    return gamesStorage.load().filter((game) => game.status === "Not started")
      .length;
  },
  totalConsoles() {
    const games = gamesStorage.load();
    const platforms = new Set(games.map((game) => game.platform));
    return platforms.size;
  },
};
