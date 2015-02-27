angular.module('starter.controllers', [])

.controller('CachesCtrl', function($scope, Caches, Map) {
	//$scope.caches = Caches.all();
	cachesToProc = Caches.all();
	cachesProcessed = []
	// Try to get distances to all caches and sort them by distance
	if(Map.getLocation() != null){
		cachesToProc.forEach( function(c, ind, arr){
		    distance = Map.getDistance(c.lat, c.lng)
			if(distance < 1200){
				distStr = Math.round(distance) + ' m'
			} else {
			    distStr = Math.round(distance/1000) + ' km'
			}
			arr[ind]['distance'] = distStr;
			arr[ind]['distanceRaw'] = distance;
		})
		cachesProcessed = cachesToProc.sort(function(a,b) { return parseFloat(a.distanceRaw) - parseFloat(b.distanceRaw) } );
	} else{
		cachesToProc.forEach( function(c, ind, arr){
		    arr[ind]['distance'] = '';
		})
		cachesProcessed = cachesToProc;
	}
	
	$scope.caches = cachesProcessed;
})


.controller('MapCtrl', function($scope, Caches, Map, $stateParams, $state) {
   	var caches = Caches.all();
	var map; 

    if ($stateParams.latlon != null && $stateParams.latlon != undefined && typeof plugin !== 'undefined') {

		coords =  $stateParams.latlon.split(',');
		latLng = new plugin.google.maps.LatLng(coords[0], coords[1]);
		Map.get().setCenter(latLng)
		Map.get().setZoom(15)
	}
	

	// plugins are not available before ths event
	document.addEventListener("deviceready", function() {
		map = plugin.google.maps.Map;
		map.on(plugin.google.maps.event.MAP_READY, onMapInit);
	});
	
	
	function onMapInit(map) {
        map.getMyLocation(onLocSuccess, onLocError);
		
		caches.forEach(function(cache){
		   latLng = new plugin.google.maps.LatLng(cache.lat, cache.lng);
		   
		    map.addMarker({
			  'position': latLng,
			  'title': cache.name,
			  'snippet': "Tap for info",
			  'infoClick': function(marker) {
				$state.go('tab.cache-detail', {'cacheId':cache.id})
			  }
		    });
			
		})
		
		
		var evtName = plugin.google.maps.event.MAP_LONG_CLICK;
		map.on(evtName, function(latLng) {
		  $state.go('tab.cache-add', {'latlon':latLng.lat + ',' + latLng.lng})
		  map.setClickable(false)
		});
		
		
	}
	
	function onLocSuccess(location) {
		map.setCenter(location.latLng)
		map.setZoom(13)
	};

	function onLocError(msg) {
	  alert("error: " + msg);
	};
	
})

.controller('CacheDetailCtrl', function($scope, $stateParams, Caches, Map) {
  $scope.cache = Caches.get($stateParams.cacheId);
  
  $scope.setMap = function(cache) {
    latLng = new plugin.google.maps.LatLng(cache.lat, cache.lng);
	Map.get().setCenter(latLng)
	Map.get().setZoom(15)
  }
})


.controller('SettingsCtrl', function($scope) {
  $scope.saveServerAddr = function(addr) {
    localStorage.setItem('GeoCahceServerURL', JSON.stringify(addr));
  };
  
  $scope.settings = {
    GeoCacheServerURL: JSON.parse(localStorage.getItem("GeoCahceServerURL"))
  };
})

.controller('CacheAddCtrl', function($scope, Map) {
  $scope.setClickable = function() {

	Map.get().setClickable(true)

  }
})

;
