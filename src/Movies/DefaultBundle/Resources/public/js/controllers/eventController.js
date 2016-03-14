
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
            response(data);
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
    var query = $( '#query-input' ).val(); // Get query

    // Execute Query
    $.ajax({
        url: 'search/person/' + query,
        dataType: "json",
        type: 'GET',
        success: function( data ) {
          spec.loadSearch(data);
        }
    });
  }
  
  spec.sort = function(movie_1, movie_2){
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
    return new Date(movie_1.release_date) - new Date(movie_2.release_date);
  };

  spec.noResultsFound = function(){
    $("#test").empty();
    $("#test").append("<span aling='center'>No results found </span>");
  }

  spec.addPages = function(data, size){
    pages = Math.ceil(size / 16);
    pagesDiv = '' ;
    $("#test").empty();
    for(var i = 0; i < pages; ++i){
      pagesDiv += '<div id="page'+ (i + 1)+'" class="row movie-table"></div>'
    }
    $("#test").append(pagesDiv);
  }

  spec.addPagination = function(size){
    pages = Math.ceil(size / 16);
    page = "";
    $(".pagination").empty();
    for(var i = 1; i <= pages; i++){
      page += '<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>'
    }
    $(".pagination").append(page);
    if(pages > 0){
      $("#page1").css('display', 'inline')
      $("#pagination").css('display', 'table');
      $(".page-link").click(spec.changePage);
    }
  }

  spec.changePage = function(){
    $(".movie-table").css('display', 'none');
    $("#page"+$(this).text()).css('display', 'inline');
  }

  spec.createPosters = function(data, size){
    movie = '';
    var i2 = 1;  
    for(var i = 0; i < size; i++){
      movie += '<div class="col-xs-6 col-md-3">';
      movie += '<a href="#" class="thumbnail" id="'+data[i]['id']+'">';
      movie += "<img src='http://image.tmdb.org/t/p/w500"+ data[i]['poster_path']+"'>";
      movie += '</a>';
      movie += "</div>";
      if (i2 == 16){
        $("#page" + Math.ceil(i/16)).append(movie);
        movie = "";
        i2 = 0;
      }
      if((i+1) === size){
        $("#page" + Math.ceil(size/16)).append(movie);
      }
      i2++
    }
    $(".thumbnail").click(spec.showDetails);
  }

  spec.loadSearch = function(data){
    $(".pagination").empty();
    $(".movie-table").css('display', 'none');
    size = data.length;
    $("#subtitle").text("Search:");
    if (size === 0){
      spec.noResultsFound();
      return;
    }
    data.sort(spec.sort);
    spec.addPages(data, size);
    spec.createPosters(data, size);
    spec.addPagination(size);
  };

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
      uri = "http://image.tmdb.org/t/p/w500" + posters[i]['file_path'];
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

        if(data["images"].length === 0){
          data["images"][0] = {"file_path": data['poster_path']}
        }
        spec.insertDetailsCarusel(data['images']);
        $(".bs-example-modal-lg").modal('show');
      }
    });
  }

  return spec;  
}
