
/*
 *  This file take care fo the formatter for each column on the bootstrap-table.
 *  This functions need to be global to make sure that bootstrap-table can
 *  uses those.
 */


/*
 *  Organize the html tag for every poster given by the API. If no
 *  poster URI is given set a default value 
 */ 
function posterFormatter(value, row, index) {
  value = value == null ? MOVIES.NO_POSTER : MOVIES.POSTERS_URI + value;

  return [
  '<span class="zoom" >',
  '<img src="' + value + '" alt="Poster" class="posters-header"',
  ' data-zoom-image="' + value + '">',
  '</span>'
  ].join('');
}

/*
 *  Organize the html tag for every movie title given by the API.
 */ 
function titleFormatter(value, row, index) {
  return [
  '<p class="title-header">' + value + '<p/>'
  ].join('');
}

/*
 *  Organize the html tag for every movie date given by the API. If no date
 *  is given it return a default value
 */ 
function dateFormatter(value, row, index) {
  isEmpty = value == '';
  noDefined = value == undefined;
  value =  isEmpty || noDefined  ? "Unknown Date" : value.split('-')[0];

  return [
    '<p class="date-header">' + value + '<p/>'
  ].join('');
}

