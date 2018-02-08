function DailyMenuViewModel() {

}

(function GetMenus() {
  // Perform the fetch
  fetch(
    "http://comm-data-dev.beckman.illinois.edu/api/v1/feeds/cafemenus?style=html"
  )
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.forEach(element => {
        $("<div>")
          .attr("class", "menuItem")
          .appendTo("#menus")
          .html(element.Description);
      });
    })
    .catch(function(message) {
      console.log("ERROR: " + toString(message));
    });
  console.log("Howdy!");
})();
