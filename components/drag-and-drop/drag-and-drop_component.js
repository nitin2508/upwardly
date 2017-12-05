(function() {
  angular.module('Upwardly')
    .component('dragAndDrop', {
      templateUrl: 'components/drag-and-drop/drag-and-drop_template.html',
      controller: DragAndDropController
    });

  function DragAndDropController($scope) {
    var vm = this;
    vm.$onInit = activate;

    function activate() {
      var dragAndDropDiv = document.getElementById('drag-and-drop');
      var wrappedDragAndDropDiv = angular.element(dragAndDropDiv)[0];

      vm.imageSource = null;
      vm.border = 'dashed';
      vm.showImage = showImage;
      wrappedDragAndDropDiv.addEventListener('drop', vm.onDrop)
      wrappedDragAndDropDiv.addEventListener('dragenter', vm.dragEnter);
      wrappedDragAndDropDiv.addEventListener('dragleave', vm.dragLeave);
      wrappedDragAndDropDiv.addEventListener('dragover', vm.dragOver);
    }

    vm.dragEnter = function(event) {
         vm.border = 'solid';
        event.preventDefault();
         $scope.$apply();
    }
    vm.dragLeave = function(event) {
        vm.border = 'dashed';
        event.preventDefault();
        $scope.$apply();
    }

    vm.dragOver = function() {
        $scope.$apply();
      event.preventDefault();
    }

    vm.onDrop = function(event) {
        vm.border = 'dashed';
        $scope.$apply();
      if (event.preventDefault) {
        event.preventDefault();
      }
      var data = event.dataTransfer;
      var fileArray = data.files;
      var imgPath = data.value;
      //
      if (fileArray.length > 1) {
        alert('Please drag and drop one file at a time');
        return;
      }

      generateImageSource(fileArray[0]);
    }

    function generateImageSource(file) {
      var extn = file.name.substring(file.name.lastIndexOf('.') + 1).toLowerCase();
      if (extn == "gif" || extn == "png" || extn == "jpg" || extn == "jpeg") {
          var reader = new FileReader();
          reader.onload = function(e) {
            vm.imageSource = e.target.result;
            vm.file = file;
            $scope.$apply();
          }
          reader.readAsDataURL(file);
      }else{
          alert('Please drop image only');
      }

    }
    function showImage(imageLink){
      // if(!checkURL(imageLink)){
      //   alert('Enter link in not image');
      //   return;
      // }
      vm.file = null;
      vm.imageSource = imageLink;
    }

//     function checkURL(url) {
//     return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
// }



  }

})();
