
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
  console.log(value);
  if ( value == '' ){ 
    value = "Unknown Date"; 
  } else {
    value = value.split('-')[0];
  } 
  return [
    '<p class="date-header">' + value + '<p/>'
  ].join('');
}


function runEffect() {
      // get effect type from
      var selectedEffect = $( "#effect" ).val();
 
      // most effect types need no options passed by default
      var options = {};
      // some effects have required parameters
      if ( selectedEffect === "scale" ) {
        options = { percent: 100 };
      } else if ( selectedEffect === "size" ) {
        options = { to: { width: 280, height: 185 } };
      }
 
      // run the effect
      $( "#effect" ).show( selectedEffect, options, 500 );
    };

 function callback() {
      setTimeout(function() {
        $( "#effect:visible" ).removeAttr( "style" ).fadeOut();
      }, 1000 );
    };    

$( "#advance" ).click(function() {
      runEffect();
});

$('#search').click(function () {
  $query = $('#query-input').val();
  $('#table-bootstrap').bootstrapTable('refresh', { url: "/search/" + $query, silent: true }); 
});

