export const gamesStorage = {
  load() {
    const stored = localStorage.getItem("game-library");

    if (stored) {
      return JSON.parse(stored);
    }

    return [];
  },
  save(games) {
    localStorage.setItem("game-library", JSON.stringify(games));
  },
};
