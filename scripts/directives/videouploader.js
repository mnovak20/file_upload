'use strict';

/**
 * @ngdoc directive
 * @name videoUploadApp.directive:videoUploader
 * @description
 * # videoUploader
 */
angular.module('videoUploadApp')
  .directive('videoUploader', function ($sce, $timeout) {
    return {
      // template: '<div></div>',
      templateUrl : 'views/videouploader.tpl.html',
      restrict: 'E',
      replace: true,
      scope: {},
      link: function link(scope, element, attrs) {

        scope.uploadedHashes = [];
        scope.showConverting = false;
        scope.uploadError = false;
        scope.uploadUrl = $sce.trustAsResourceUrl('https://upload.wistia.com/?api_password=284959f10cbf8a7ab287e3443a4699b61bd4ea13ad78a205a665fe5982ca404c');


        // captures new_video event and kick off the process to show the video
        scope.$on('new_video',function(e,data){
          
          scope.uploadError = false;
          
          // length of timeout based on file size. 
          var timeoutLength = data.size/100;
           console.log('timeoutLnegth',timeoutLength);
           scope.showConverting = true;
           scope.$digest();

           // wait for timeoutLength and then push url to array to show the uploaded video in the frontend.
           $timeout(function() {
            scope.showConverting = false;
            scope.uploadedHashes.push($sce.trustAsResourceUrl('//fast.wistia.net/embed/iframe/'+data.hash+'?videoFoam=true'));
           }, timeoutLength);
        });


        // captures upload_error event and shows the error in the frontend
        scope.$on('upload_error',function(e,data){
          scope.uploadError = true;
          scope.errorReason = data.reason;
          scope.$digest();
        });


        // takes the selected file and uploads to the wistia endpoint
        $('#fileupload').fileupload({
            dataType: 'json',
            maxFileSize: 150000000,
            crossDomain: true,
            done: function (e, data) {

                // done uploading, get data.result.hash emit up the hash
                if(data && data.result && data.jqXHR.status === 200){
                    scope.$emit('new_video',{'hash':data.result.hashed_id, 'size': data.total});
                } 
                else if(data.jqXHR.status = 400){
                    // 400 most likely means there are too mnay videos in the wistia account
                    scope.$emit('upload_error',{'reason':'Too many videos uploaded.'});
                } else{
                    // on other errors send the error code
                    scope.$emit('upload_error',{'reason': 'Error code '+data.jqXHR.status});
                };

                // set progress bar to 0 after upload is complete
                $('.progress-bar').css('width','0%');
            },
             progressall: function (e, data) {

                // figure out amount of data that was uploaded and update progress bar
                var progress = parseInt(data.loaded / data.total * 100, 10);
                $('.progress-bar').css('width',progress + '%');
            }
        });
      }
    };
  });


