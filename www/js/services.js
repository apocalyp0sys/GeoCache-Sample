angular.module('starter.services', [])


/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [{
    id: 0,
    name: 'Ben Sparrow',
    notes: 'Enjoys drawing things',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  },];


  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
})
.factory('Caches', function() {

  var caches = [{
    id: 0,
    name: 'Irvington',
    description: 'Under the bridge on the north side',
    lat: 40.712216,
	lng: -74.22655,
  },{
    id: 1,
    name: 'Strange Place',
    description: 'Unknown',
    lat: 57.712216,
	lng: 34.22655,
  },{
    id: 2,
    name: 'Old water storage facility',
    description: 'Bottom of the western tank',
    lat: 56.791995,
	lng: 60.596348,
  }, ];


  return {
    all: function() {
      return caches;
    },
    get: function(cacheId) {
      for( x in caches){
		if(caches[x].id == cacheId)
			return caches[x]
	  }
    }
  }
})
.factory('Map', function() {

	var rad = function(x) {
	  return x * Math.PI / 180;
	};

	var getDistance = function(p1, p2) {
	  var R = 6378137; // Earth’s mean radius in meters
	  var dLat = rad(p2.lat - p1.lat);
	  var dLong = rad(p2.lng - p1.lng);
	  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(rad(p1.lat)) * Math.cos(rad(p2.lat)) *
		Math.sin(dLong / 2) * Math.sin(dLong / 2);
	  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	  var d = R * c;
	  return d; // returns the distance in meters
	};
	var map;
	var location = null;
	
	document.addEventListener("deviceready", function() {

		map = plugin.google.maps.Map;
			
		map.on(plugin.google.maps.event.MAP_READY, function(map){
			map.getMyLocation(function(loc){
			    location = loc
			},
			
			function(){
			   alert("Unable to get current coordinates: " + msg);
			});
		});
	 })

  return {

	getDistance: function(lat, lng) {
	  if(location != null){
		  latLng = new plugin.google.maps.LatLng(lat, lng);
		  return getDistance(latLng, location.latLng);
	  }
	  return null;
    },
    getLocation: function() {
      return location;
    },
	get: function() {
      return map;
    }
  }
});
