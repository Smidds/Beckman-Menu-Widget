/**
 * Gets the daily specialty menus from the Beckman Comms DEV API
 *
 * @return
 *  The specialty menus in JSON format
 */
function GetMenus() {
  // Perform the fetch
  self.menus = ko.observableArray();
  fetch(
    "http://comm-data-dev.beckman.illinois.edu/api/v1/feeds/cafemenus?style=unicode"
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      self.menus(json);
    })
    .catch(function(message) {
      console.log("ERROR: " + toString(message));
    });
}

/**
 * The DailyMenuViewModel for the index.html
 */
function DailyMenuViewModel() {
  var self = this;
  GetMenus();
}

ko.applyBindings(new DailyMenuViewModel());
