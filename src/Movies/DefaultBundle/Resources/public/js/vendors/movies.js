
function posterFormatter(value, row, index) {
  if (value == null){
    value = 'http://cdn.amctheatres.com/Media/Default/Images/noposter.jpg';
  } else {
    value = "http://image.tmdb.org/t/p/w500" + value; 
  }
  return [
  '<img src="' + value + '" alt="Poster" class="posters-header">'
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

  if ( option === undefined ){
    option = 'person';
  }

  var query = $( '#query-input' ).val();
  console.log( '/search_'+ option + '/' + query );
  $( '#table-bootstrap' ).bootstrapTable(
    'refresh', 
    { url: '/search_'+ option + '/' + query, silent: true } ); 
});

