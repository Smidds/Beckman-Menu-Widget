 //'http://comm-data-dev.beckman.illinois.edu';
 $("#run").click(() => {
  $.post("http://localhost:50345/api/v1/feeds/updatelisteners?entity=cafemenu", {});
});


 var connection = $.hubConnection();
var cafeMenuProxy = connection.createHubProxy('cafeMenu');

connection.url = 'http://localhost:50345/signalr';

cafeMenuProxy.on('updateMenu', function() {
  console.log("The event was triggered!");
});

connection.start()
  .done(() => {
    console.log('Now connected, connection ID=' + connection.id)
    cafeMenuProxy.invoke("updateMenu", function() {
      console.log("The event was triggered!");
      $.getJSON("http://comm-data-dev.beckman.illinois.edu/api/v1/feeds/cafemenus?style=html", function(response){
        console.log(response);
      
        //self.menus(MakeMenus(response));
      });
    });
  })
  .fail((error) => 
    {console.log('Failure to connect! Error: ' + typeof(error))
  });