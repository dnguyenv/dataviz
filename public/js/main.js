$( document ).ready(function() {
    console.log( "ready!" );
	$.get( "/1", function( data ) {
		var events = data.events || [];
		buildListViewResults(events);
	});
});

var buildListViewResults = function(items) {
	console.log('buildListViewResults', items);
	var listview = $('.my-iot-view');
	var it={};
	var evt='';
	var li;
	var a;
	var desc;
	var timestamp;

	if (items.length == 0) {
		li = $('<li>No records found</li>');
		listview.append(li);
		listview.listview("refresh");
		return;
	}

	for (var i=0; i<items.length; i++) {
		it = items[i];
		timestamp = new Date(it['timestamp']['$date']);
		evt = it['evt'];
		desc = 'Counter: ' + evt['counter'];
		desc += ', Humid%: ' + evt['Humid%'];
		desc += ', TempC: ' + evt['TempC'];
		desc += ', TempF: ' + evt['TempF'];

		li = $('<li data-icon="false"></li>');
		h = $('<h3></h3>').html(it['device_id'] + ' ' + it['device_type'] + ' ' + timestamp);
		p = $('<p></p>').text(desc);
		a = $('<a></a>').on("tap", function(){console.log('Tap me')});
		a.append(h).append(p);
		li.append(a);
		listview.append(li);
	}//for

	listview.listview("refresh");
}
