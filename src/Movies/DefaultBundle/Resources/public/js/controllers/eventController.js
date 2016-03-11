
/*
 * This "object" is responsable of all the events on the UI 
 */
MOVIES.UI.EventsController = function(spec){

  spec = spec || {};


  /*
   * Display options Panel 
   * the button "Option" button is clicked
   */
  spec.showOptions = function() {
    var state =  $('#options-div').css('display');
    var method = state === 'none' ? 'show' : 'hide';

    $( '#options-div' )[method]( 'blind', {}, 500 );
  }


  /*
   * Call the method refresh on the bootstrap-table with a new URI after
   * the button Search is clicked
   */
  spec.searchAction = function() {
    var option = getSearchType() // Get search type 
    var query = $( '#query-input' ).val(); // Get query

    // Execute Query
    $( '#table-bootstrap' ).bootstrapTable(
      'refresh', 
      { url: 'search_'+ option + '/' + query, silent: false } );
    $("#main-table").show();
  }


  /* Private Function:
   * Gets the type of search that the user ask from the value on the radio
   * buttons
   */
  var getSearchType = function() {
    var option = $('input:radio[name=search]:checked').val();

    return option === undefined ? 'person' : option;
  };


  /* 
   * Load the zoom pluging in every single picture
   */
  spec.tableOnLoad = function(data) {
    $('.posters-header').elevateZoom({ 
      zoomType: "inner", 
      cursor: "crosshair" 
    });
  }

  /*
   * Keyboard event to search when the Enter key is press
   */
  spec.searchOnEnterKey = function(event){
    if (event.keyCode == 13) {
      spec.searchAction(0)
    }
  }

  return spec;  
}
