function Menu(Title, DateTime, Description) {
  var self = this;
  self.title = ko.observable(Title);
  self.date = ko.observable(DateTime);
  self.desc = ko.observable(Description);
}

function MakeMenus(json) {
  var self = this;
  // Here we need to go through the elements of the JSON and create objects
  var len = json.length;
  menusArray = [];
  for (var i = 0; i < len; i++) {
    var dayMenu = json[i];
    menusArray.push(new Menu(dayMenu.Title, dayMenu.Date, dayMenu.Description));
  }
  return menusArray;
  //return menusArray; // Async is causing this to fail
}

/**
 * The DailyMenuViewModel for the index.html
 */
function DailyMenuViewModel() {
  var self = this;
  self.menus = ko.observableArray([]);
  (function getMenus(){
    fetch(
      "http://comm-data-dev.beckman.illinois.edu/api/v1/feeds/cafemenus?style=unicode"
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        self.menus(MakeMenus(json));
      });
    setTimeout(getMenus, 3000);
  })();
}

ko.applyBindings(new DailyMenuViewModel());
