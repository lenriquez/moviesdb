

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

    $table = $('#table').bootstrapTable();
    $query = $('#query-input').val();
    console.log( 'http://127.0.0.1:8000/search/'+ $query );
    $table.bootstrapTable('refresh', { url: "/search/driver" + $query }); 
});

