export const gamesStorage = {
  load() {
    console.log("Loading games...");
    const stored = localStorage.getItem("game-library");

    if (stored) {
      console.log("Found games in localStorage");
      return JSON.parse(stored);
    }

    console.log("No games found, starting with empty array");
    return [];
  },
  save(games) {
    console.log("Saving games:", games);
    localStorage.setItem("game-library", JSON.stringify(games));
    console.log("Games saved!");
  },
};
