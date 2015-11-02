'use strict';

/**
 * @ngdoc directive
 * @name videoUploadApp.directive:videoUploader
 * @description
 * # videoUploader
 */
angular.module('videoUploadApp')
  .directive('videoUploader', function ($sce, Upload) {
    return {
      // template: '<div></div>',
      templateUrl : 'views/videouploader.tpl.html',
      restrict: 'E',
      replace: true,
      link: function link(scope, element, attrs) {

        scope.uploadUrl = $sce.trustAsResourceUrl('https://api.wistia.com/v1/medias.json?api_password=284959f10cbf8a7ab287e3443a4699b61bd4ea13ad78a205a665fe5982ca404c');
        scope.progressPercentage = 0;
        scope.fileToUpload = null;

        scope.$watch('fileToUpload',function(){
          console.log('file changed', scope.fileToUpload);
        })

         // upload on file select or drop
        scope.upload = function (file) {
          if(file){
             Upload.upload({
                  url: scope.uploadUrl,
                  data: {file: file}
              }).then(function (resp) {
                  console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
              }, function (resp) {
                  console.log('Error status: ' + resp.status);
              }, function (evt) {
                  scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                  console.log('progress: ' + scope.progressPercentage + '% ' + evt.config.data.file.name);
              });
          }
             
        };


        // $(function () {
        //     $('#fileupload').fileupload({
        //         dataType: 'json',
        //          maxFileSize: 150000000,
        //         done: function (e, data) {
        //             console.log('data after done',data);
        //             $.each(data.result.files, function (index, file) {
        //                 $('<p/>').text(file.name).appendTo(document.body);
        //             });
        //         },
        //          progressall: function (e, data) {
        //             scope.uploadProgress = parseInt(data.loaded / data.total * 100, 10);
        //             console.log('scope.uploadProgress',scope.uploadProgress);
        //         }
        //     });
        // });

        

      }
    };
  });


