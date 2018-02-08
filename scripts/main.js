/**
 * Gets the daily specialty menus from the Beckman Comms DEV API
 *
 * @return
 *  The specialty menus in JSON format
 */
function GetMenus() {
  // Perform the fetch
  var self = this;
  self.menus = ko.observableArray();
  fetch(
    "http://comm-data-dev.beckman.illinois.edu/api/v1/feeds/cafemenus?style=unicode"
  )
    .then(response => {
      return response.json();
    })
    .then(json => {
      console.log("Loading...");
      MakeMenus(json);
    })
    .catch(function(message) {
      console.log("ERROR: " + toString(message));
    });
}

function MakeMenus(json) {
  // Here we need to go through the elements of the JSON and create objects
  self.menus(json);
}

/**
 * The DailyMenuViewModel for the index.html
 */
function DailyMenuViewModel() {
  var self = this;
  GetMenus();
  //setInterval(GetMenus, 30000);
}

ko.applyBindings(new DailyMenuViewModel());
