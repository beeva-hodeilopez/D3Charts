'use strict';

describe('Directive: d3Progress', function () {

  // load the directive's module and view
  beforeEach(module('gestorClientesApp'));
  beforeEach(module('components/directives/d3-progress/d3-progress.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<d3-progress></d3-progress>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the d3Progress directive');
  }));
});