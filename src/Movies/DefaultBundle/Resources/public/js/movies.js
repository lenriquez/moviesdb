
function posterFormatter(value, row, index) {
  if (value == null){
    value = 'http://cdn.amctheatres.com/Media/Default/Images/noposter.jpg';
  } else {
    value = "http://image.tmdb.org/t/p/w500" + value; 
  }

  return [
  '<span class="zoom" >',

  '<img src="' + value + '" alt="Poster" class="posters-header"',
  ' data-zoom-image="' + value + '">',
  '</span>'
  ].join('');
}

function titleFormatter(value, row, index) {
  return [
  '<p class="title-header">' + value + '<p/>'
  ].join('');
}

function dateFormatter(value, row, index) {
  if ( value == '' || value == undefined ){ 
    value = "Unknown Date"; 
  } else {
    value = value.split('-')[0];
  } 
  return [
    '<p class="date-header">' + value + '<p/>'
  ].join('');
}


function showOptions() {  
  var state =  $('#options-div').css('display');
  var method = state === 'none' ? 'show' : 'hide';

  $( '#options-div' )[method]( 'blind', {}, 500 );
};


$( '#options' ).click( function() {
  showOptions();
});

$( '#search' ).click( function() {
  var option = $('input:radio[name=search]:checked').val();
  $('#main-table').show()


  if ( option === undefined ){
    option = 'person';
  }

  var query = $( '#query-input' ).val();
  $( '#table-bootstrap' ).bootstrapTable(
    'refresh', 
    { url: '/search_'+ option + '/' + query, silent: false } );
});

$('#table-bootstrap').bootstrapTable({
  onLoadSuccess: function (data) {
    $('.posters-header').elevateZoom({ 
    zoomType: "inner", 
    cursor: "crosshair" 
  });
  }
});

