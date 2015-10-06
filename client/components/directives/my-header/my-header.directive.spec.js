'use strict';

describe('Directive: myHeader', function () {

  // load the directive's module and view
  beforeEach(module('d3ChartsApp'));
  beforeEach(module('components/directives/my-header/my-header.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-header></my-header>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the myHeader directive');
  }));
});