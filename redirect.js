// Assuming you have AngularJS (1.x) included in your project.

var app = angular.module('jwtApp', []);

app.controller('JwtController', function ($scope, $http) {
  $scope.jwt_response = 0;
  $scope.jwt_phone = '';

  $scope.decodeJwt = function () {
    var API_KEY = 'API_KEY'; // Please specify API key provided by Phone Email mobile application
    var phtoken = $scope.phtoken;

    if (phtoken) {
      try {
        var decoded = KJUR.jws.JWS.readSafeJSONString(KJUR.jws.JWS.verify(phtoken, KJUR.KEYUTIL.getKey(API_KEY)));
        $scope.jwt_response = 1; // JWT decoded successfully
        $scope.jwt_phone = decoded.country_code + decoded.phone_no; // You will get the user's phone number here from JWT
      } catch (e) {
        $scope.jwt_response = 0; // Invalid JWT
        $scope.jwt_phone = '';
      }
    } else {
      $scope.jwt_response = 0; // Invalid JWT
      $scope.jwt_phone = '';
    }
  };
});
