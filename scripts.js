var app = angular.module("ng-Flickr", []).constant("FLICKR_API_KEY", "f051d8fed177bb7c8ac6bc9435be0927");

app.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('SearchController', function ($scope, photoData) {
    $scope.thumbSize = 'small';
    $scope.setThumbSize = function (size) { $scope.thumbSize = size; };

    $scope.searchFlickr = function getPhotos() {
        $scope.photos = [];
        $scope.items = [];

        photoData.getAllItems($scope.searchKeyword).then(function (data) {
            var parsedData = angular.fromJson(data);
            $scope.items = parsedData.photos.photo;

            for (var i = 0; i < $scope.items.length; i++) {
                var photo = $scope.items[i];
                $scope.photos.push({ title: photo.title, thumbUrl: ' http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg' });
            }
            console.log(photos);
        },
        function (errorMessage) {
            $scope.error = errorMessage;
        });
    };
});

app.factory('photoData', function ($http, $q, FLICKR_API_KEY) {
    return {
        getAllItems: function (keyWord) {
            //Creating a deferred object
            var deferred = $q.defer();
            var apiUrl = 'http://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + FLICKR_API_KEY + '&tags=' + keyWord + '&format=json&nojsoncallback=1';

            // $http.defaults.useXDomain = true;
            //delete $http.defaults.headers.common['X-Requested-With'];

            //Calling Web API to fetch pics
            $http.get(apiUrl).success(function (data) {
                //Passing data to deferred's resolve function on successful completion
                deferred.resolve(data);
            }).error(function (error) {
                //Sending a friendly error message in case of failure
                deferred.reject("An error occured while fetching items");
            });
            //Returning the promise object
            return deferred.promise;
        }
    }
});

// var ngFlickr = angular.module("ng-Flickr", [])
// .constant("FLICKR_API_KEY", "f051d8fed177bb7c8ac6bc9435be0927")
// .config(function($httpProvider) {
//   delete $httpProvider.defaults.headers.common['X-Requested-With'];
//   $httpProvider.defaults.useXDomain = true;
// })

// .controller('SearchController', function($scope, $http, $sce, FLICKR_API_KEY) {
//   $scope.flickrURL = "https://farm";

//   $scope.trustSrc = function(src) {
//     return $sce.trustAsResourceUrl(src);
//   };

//   $scope.searchFlickr = function(keyword) {
//     $scope.keyword = keyword;

//     var url = "https://api.flickr.com/services/rest";

//     var request = {
//       method: 'flickr.photos.search',
//       api_key: FLICKR_API_KEY,
//       tags: keyword,
//       format: 'json',
//       nojsoncallback: 1
//     };

//     $http({
//       method: "GET",
//       url: url,
//       params: request
//     })
//     .then(function(response) {
//       $scope.results = response.data.items;
//       console.log(response)
//     },
//     function(response) {
//       alert('error');
//     });
//   };
// });