export class Router {
  /* 
    Constructor: Router
    -------------------
    Initializes the router with references to the main content area and the pages object.
    Binds event handler methods to maintain the correct 'this' context.
  */
  constructor(mainContentArea, pageContent) {
    // Reference to the DOM element where page content will be injected
    this.mainContentArea = mainContentArea;

    // Object containing all pages: { home: {...}, about: {...}, ... }
    this.pageContent = pageContent;

    // Bind event handlers so 'this' refers to the router instance
    this.handleClick = this.handleClick.bind(this);
    this.handleNavigate = this.handleNavigate.bind(this);
    this.handlePopState = this.handlePopState.bind(this);
  }

  /* 
    Function: updateMainContent
    ----------------------------
    Updates the <main> content area with the HTML of the selected page.
    Calls the page's setup() function if it exists (for async operations like fetching data).
    Updates browser history/URL and document title.
  */
  async updateMainContent(pageKey, params = {}) {
    // Get the page data from the pageContent object
    const content = this.pageContent[pageKey];

    if (content) {
      // Replace all existing HTML in the main content area with the new page's HTML
      this.mainContentArea.innerHTML = content.html;

      // If the page has a setup function, call it (e.g., for async data fetching)
      if (typeof content.setup === "function") {
        await content.setup(params.gameId);
      }

      // Construct the URL hash, including gameId if provided
      let url = "#" + pageKey; // Start with the page key

      // If there is a gameId, add it as a query string
      if (params.gameId) {
        url = url + "?id=" + params.gameId;
      }

      // Update browser history without reloading the page
      history.pushState({ pageKey, params }, content.title, url);

      // Update the browser tab title
      document.title = content.title;
    }
  }

  /* 
    Event Handler: handleClick
    --------------------------
    Delegates click events on elements with a 'data-page' attribute.
    Dispatches a 'navigate' event to update the page content.
  */
  handleClick(event) {
    // Find the closest element with the data-page attribute
    const button = event.target.closest("[data-page-target]");
    // Ignore clicks outside navigational elements
    if (!button) return;

    // Prevent the default anchor behavior (page reload)
    event.preventDefault();

    // Dispatch a custom 'navigate' event with the target page
    document.dispatchEvent(
      new CustomEvent("navigate", {
        detail: { page: button.dataset.pageTarget },
      })
    );
  }

  /* 
    Event Handler: handleNavigate
    -----------------------------
    Called when a custom 'navigate' event is dispatched.
    Updates the main content area to the requested page.
  */
  handleNavigate(event) {
    this.updateMainContent(event.detail.page, event.detail);
  }

  /* 
    Event Handler: handlePopState
    -----------------------------
    Handles browser back/forward navigation.
    Updates the main content area based on the current history state or URL hash.
  */
  handlePopState(event) {
    if (event.state) {
      // If state exists, update content based on stored pageKey and params
      this.updateMainContent(event.state.pageKey, event.state.params);
    } else {
      // If no state, fallback: parse URL hash for pageKey and params
      const hash = window.location.hash.substring(1);
      const [pageKey, query] = hash.split("?");
      const params = {};
      if (query) {
        const urlParams = new URLSearchParams(query);
        params.gameId = urlParams.get("id");
      }

      // Show the page from the hash or default to 'dashboard-page'
      this.updateMainContent(pageKey || "dashboard-page", params);
    }
  }

  /* 
    Function: init
    ---------------
    Sets up all necessary event listeners:
      - Click delegation for navigation
      - Custom 'navigate' events
      - Browser back/forward navigation
  */
  init() {
    document.addEventListener("click", this.handleClick);
    document.addEventListener("navigate", this.handleNavigate);
    window.addEventListener("popstate", this.handlePopState);
  }
}
