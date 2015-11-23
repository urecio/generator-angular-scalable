angular.module('testToast', ['ngSanitize', 'ngToast'])
.directive('vsToast', function(ngToast) {
  return {
    replace: true,
    restrict: 'A',
    templateUrl: 'js/toast.html',
    link: function($scope) {
      angular.extend($scope, {
        dangerToast : function(content, timeout) {
          timeout = timeout || 4000;
          return ngToast.create({
            className: 'toast-error',
            content: content,
            timeout: timeout
          });
        },
        okToast : function(content, timeout) {
          timeout = timeout || 4000;
          return ngToast.create({
            className: 'toast-ok',
            content: content,
            timeout: timeout
          });
        },
        undoOperationToast : function(content, timeout) {
          timeout = timeout || 4000;
          return ngToast.create({
            className: 'undoOperation-ToastContainer',
            content: content,
            timeout: timeout
          });
        }
      });
    }
  };
});
