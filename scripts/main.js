 //'http://comm-data-dev.beckman.illinois.edu';
var connection = $.hubConnection();
var cafeMenuProxy = connection.createHubProxy('cafeMenu');

connection.url = 'http://localhost:50345/signalr'
connection.start()
  .done(() => {
    console.log('Now connected, connection ID=' + connection.id)
  })
  .fail((error) => 
    {console.log('Failure to connect! Error: ' + typeof(error))
  });