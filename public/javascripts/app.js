var app = angular.module('angular-zenbox', []);

app.controller('MainController', function($scope) {
  $scope.data = {
    modal2Value: '',
    modal3Value: '',
    step: null
  };
});

app.directive('modal', function($timeout) {
  return function link(scope, elem, attrs) {
    scope.$watch(attrs.modal, function(value) {
      if (!!value) {
        if (attrs.modalClose) {
          $(document).one('zenbox-closed', function() {
            if ($.zenbox.lock !== elem) return;
            scope.$apply(attrs.modalClose);
          });
        }
        $.zenbox.lock = elem;
        if (attrs.modalOpen) {
          scope.$eval(attrs.modalOpen);
        }
        $.zenbox.show(elem);
      } else {
        $timeout(function() {
          if (elem === $.zenbox.lock) $.zenbox.close();
        }, 0);
      }
    });
  };
});

app.directive('transcluded', function() {
  return {
    scope: true,
    template: "<div modal='showModal' modal-close='data.step=null' class='modal'>" +
                "<div ng-transclude></div>" +
              "</div>",
    transclude: true,
    link: function(scope, elem, attrs) {
      scope.$watch('data.step', function(value) {
        if (value == attrs.transcluded) {
          scope.showModal = true;
        } else {
          scope.showModal = false;
        }
      })
    }
  };
});
