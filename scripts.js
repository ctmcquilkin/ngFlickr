var ngFlickr = angular.module("ng-Flickr", [])
.constant("FLICKR_API_KEY", "f051d8fed177bb7c8ac6bc9435be0927")
.config(function($httpProvider) {
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.defaults.useXDomain = true;
})

.controller('SearchController', function($scope, $http, $sce, FLICKR_API_KEY) {
  $scope.flickrURL = "https://farm";

  $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  };

  $scope.searchFlickr = function(keyword) {
    $scope.keyword = keyword;

    var url = "https://api.flickr.com/services/rest";

    var request = {
      method: 'flickr.photos.search',
      api_key: FLICKR_API_KEY,
      tags: keyword,
      format: 'json',
      nojsoncallback: 1
    };

    $http({
      method: "GET",
      url: url,
      params: request
    })
    .then(function(response) {
      $scope.results = response.data.items;
      console.log(response)
    },
    function(response) {
      alert('error');
    });
  };
});