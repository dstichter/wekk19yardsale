angular.module('yardsale', [])
.controller('yardsaleController', function($scope, $http) {
  $scope.addItem = function () {
    $http.post('/api/newItem', newItem).then(function(response){

    })
  }
  $scope.addComment = function() {
    $http.post('/api/newComment', {comment: $scope.newComment}).then(function(response){
      console.log(response);
    })

  }
  $scope.buyItem = function() {
    $http.post('/api/buyItem', buyItem).then(function(response){

    })
  }
  $scope.getSales = function() {
    $http.get('/sales').then(function(response){
      $scope.yardsales = response.data
    })
  }

})
