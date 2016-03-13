
/*
 * This "object" is responsable of all the events on the UI 
 */
MOVIES.UI.EventsController = function(spec){
  spec = spec || {};
  /*
   *  Return autocomplete JSON Object
   */
  spec.autocomplete = function(){
    return {
      source: function( request, response ) {
        $.ajax({
          url: 'search/autocomplete/' + $( "#query-input" ).val(),
          success: function( data ) {
            response( data );
          }
        });
      },
      minLength: 2
    }
  }

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
    var option = 'person'//getSearchType() // Get search type 
    var query = $( '#query-input' ).val(); // Get query

    // Execute Query
    $( '#table-bootstrap' ).bootstrapTable(
      'refresh', 
      { url: 'search/'+ option + '/' + query, silent: false } );
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

  spec.loadListMovies = function(data){
    console.log(data);
    data = data['results'];
    size = data.length;
    movie = '';
    for(var i = 0; i < size; ++i){
      movie += '<div class="col-xs-6 col-md-3">';
      movie += '<a href="#" class="thumbnail" id='+data[i]['id']+'>';
      movie += "<img src='http://image.tmdb.org/t/p/w500/"+ data[i]['poster_path']+">";
      movie += '</a>';
      movie += "</div>";
    }
    $("#test").append(movie);
    $(".thumbnail").click(spec.showDetails);
  }

  spec.loadPopularMovies = function(){
    $.ajax({
        url: 'movies/popular',
        success: function( data ) {
          spec.loadListMovies(data);
        }
    });
    option = {percent: 0};
  }

  spec.insertDetailsCarusel= function(posters){
    size = posters.length;
    carusel = $(".carousel-inner");
    carusel.empty();

    // Insert Active Item
    uri = "http://image.tmdb.org/t/p/w500/" + posters[0]['file_path'];
    carusel.append('<div class="item active"><img height=550 src="'+ uri +'"></div>');

    // Insert the rest
    for(var i = 1; i < size; ++i){
      uri = "http://image.tmdb.org/t/p/w500/" + posters[i]['file_path'];
      carusel.append('<div class="item"><img height=550 src="'+ uri +'"></div>');
    }
  }

  spec.showDetails = function(event){
    var id = $(this).attr('id');
    $.ajax({
      url: 'movies/'+ id,
      success: function( data ) {
        $(".modal-title span").text(data['original_title']);
        $("#overview").text(data['overview']);
        $("#home_page").empty();
        $("#home_page").append('<a href="'+data['homepage']+'">'+data['homepage']+'</a>');
        $("#imdb_id").text(data['imdb_id']);
        $("#language").text(data['original_language']);
        $("#release_date").text(data['release_date']);
        $("#runtime").text(data['runtime']);
        $("#status").text(data['status']);

        spec.insertDetailsCarusel(data['images']);
        //$("#item").append('<img src="'+ +'">')
        $(".bs-example-modal-lg").modal('show');
      }
    });
  

  //console.log(movie);
  //$(".modal-title span").text(movie['original_title']);
  //$("#modal-image").attr('src',"http://image.tmdb.org/t/p/w500/"+ movie['backdrop_path']+">");
  //$(".bs-example-modal-lg").modal('show');
  }

  return spec;  
}
