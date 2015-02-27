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
});


.factory('Caches', function() {

  var caches = [{
    id: 0,
    name: 'sheregesh',
    description: 'under some boulders on the north side of a large tree',
    lat: 40.712216,
	lng: -74.22655,
  },];


  return {
    all: function() {
      return caches;
    },
    get: function(cacheId) {
      // Simple index lookup
      return caches[cacheId];
    }
  }
});
