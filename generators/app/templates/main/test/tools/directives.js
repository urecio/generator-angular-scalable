/**
 * createDirective - description
 *
 * @param  {Object} data     collection with data to include on the scope
 * @param  {String} template valid string template to compile
 * @return {Object} element  compiled directive element$scope
 */
function createDirective(template, data, scope) {
  var elm;
  var $httpBackend;
  var $rootScope;
  var $compile;

  inject(function($injector) {
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $compile = $injector.get('$compile');
  });

  //Any html can be getted for the directives
  $httpBackend.whenGET(/.*\.html?/).respond('<div></div>');

  //Scope data creation
  if(scope) {
    $scope = scope;
  } else {
    var $scope = $rootScope.$new();
    _.assign($scope, data);  
  }


  // Create directive
  elm = $compile(template)($scope);
  $scope.$digest();

  // Return
  return elm;
}
