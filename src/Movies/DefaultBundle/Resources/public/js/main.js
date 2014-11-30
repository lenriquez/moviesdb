


MOVIES.UI.Main = function(spec){
  spec = spec || {}

  //Private Attribute
  var controller = MOVIES.UI.EventsController();

  /* 
   * Plug UI elements with Event Controller
   */
  spec.initilize = function() {
    $( '#options' ).click( controller.showOptions );
    $( '#search' ).click(  controller.searchAction );
    $( '#table-bootstrap' ).bootstrapTable({
      onLoadSuccess: controller.tableOnLoad
    });
  }

  return spec;
}

main = MOVIES.UI.Main();
main.initilize();

