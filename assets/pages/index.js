// Import pages
import { homePage } from "../pages/home.js";
import { gamesListPage } from "../pages/games-list.js";
import { settingsPage } from "../pages/settings.js";
import { gameDetailsPage } from "../pages/game-details.js";

// Combine all pages into the pageContent object
export const pageContent = {
  "dashboard-page": homePage,
  "games-list-page": gamesListPage,
  "settings-page": settingsPage,
  "game-details-page": gameDetailsPage,
};
