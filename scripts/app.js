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
    $.getJSON("http://comm-data-dev.beckman.illinois.edu/api/v1/feeds/cafemenus?style=html", function(response){
      self.menus(MakeMenus(response));
    });
    setTimeout(getMenus, 3000);
  })();
}

ko.applyBindings(new DailyMenuViewModel());