module.controller('cameraCtrl', function($scope, $cordovaCamera) {

  document.addEventListener("deviceready", function () {
      $cordovaPlugin.someFunction().then(success, error);
    }, false);

    // OR with IONIC

    $ionicPlatform.ready(function() {
      $cordovaPlugin.someFunction().then(success, error);
    });

  $scope.takePicture = function() {
    var options = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
	    correctOrientation:true
    };

    $cordovaCamera.getPicture(options).then(function(imageData) {
      var image = document.getElementById('myImage');

      $scope.imgURI = "data:image/jpeg;base64," + imageData;
    }, function(err) {
      // error
    });

  };
  }, false);

}); 
