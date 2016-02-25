var app = angular.module("ng-Flickr", []);

app.config(function ($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});

app.controller('SearchController', ['$scope', 'photoData', function ($scope, photoData) {
    // $scope.thumbSize = 'small';
    // $scope.setThumbSize = function (size) { $scope.thumbSize = size; };
        
    $scope.searchFlickr = function getPhotos() {
        $scope.photos = [];
        $scope.items = [];

        photoData.getAllItems($scope.keyWord).then(function (data) {
                //alert(data.message);
            var parsedData = angular.fromJson(data);
            $scope.items = parsedData.photos.photo;

            for (var i = 0; i < $scope.items.length; i++) {
                var photo = $scope.items[i];
                $scope.photos.push({ title: photo.title, thumbUrl: ' http://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_m.jpg' });
            }
            console.log($scope.photos);
        },
        function (errorMessage) {
            $scope.error = errorMessage;
        });
    };
}]);

app.factory('photoData', ['$http', '$q', function ($http, $q, FLICKR_API_KEY) {
    return {
        getAllItems: function (keyWord) {
            //Creating a deferred object
            var deferred = $q.defer();
            var apiUrl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=*redacted*&tags=' + keyWord + '&format=json&nojsoncallback=1';

            $http.defaults.useXDomain = true;
            // delete $http.defaults.headers.common['X-Requested-With'];

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
}]);