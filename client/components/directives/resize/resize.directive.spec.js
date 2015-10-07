'use strict';

describe('Directive: resize', function () {

  // load the directive's module
  beforeEach(module('gestorClientesApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<resize></resize>');
    element = $compile(element)(scope);
    expect(element.length).toBe(1);
  }));
});
