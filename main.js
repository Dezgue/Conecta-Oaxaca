google.maps.event.addDomListener(window,'click',drawMap);

function drawMap(){
	var mapa;
	var opcionesMapa = {
		zoom: 15,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	mapa = new google.maps.Map(document.getElementById('canvasGoogle'),opcionesMapa);
	navigator.geolocation.getCurrentPosition(function(posicion){
		var geolocalizacion = new google.maps.LatLng(posicion.coords.latitude, posicion.coords.longitude);
		var marcador = new google.maps.Marker({
			map: mapa,
			draggable: false,
			position:geolocalizacion,
			visible: true
		});
		mapa.setCenter(geolocalizacion);
		calcRoute(geolocalizacion,mapa);
	});
}

function calcRoute(inicioRuta,mapa){
	var directionsService = new google.maps.DirectionsService();
	var directionsRenderer = new google.maps.DirectionsRenderer();
	directionsRenderer.setMap(mapa);
	//EN ESTA PARTE PONES LA LATITUD Y LONGITUD DEL LUGAR A DONDE VAS A IR, TU UBICACION YA ES CALCULADA
	//EN AUTOMATICO
	var posicionSitioTaxis = new google.maps.LatLng(17.0606113,-96.7178765);
	var marcador = new google.maps.Marker({
		map: mapa,
		draggable: false,
		position:posicionSitioTaxis,
		visible: true
	});
	var request = {
		origin: inicioRuta,
		destination: posicionSitioTaxis,
		travelMode: google.maps.DirectionsTravelMode.WALKING
	}
	directionsService.route(request,function(response, status){
		if(status == google.maps.DirectionsStatus.OK){
			directionsRenderer.setDirections(response);
		}
	});
}

