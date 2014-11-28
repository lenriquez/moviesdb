

MOVIES.UI.EventsController = function(spec){
	spec = spec || {};

	var searchButtonAction  = function() {
		$table = $('#table').bootstrapTable();
		$query = $('#query-input').val();
		$table.bootstrapTable('refresh', { url: '/search/'+ query });
	};

}