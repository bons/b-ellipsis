'use strict';

require('angular');
require('angular-mocks');
var app = require('../lib/b-ellipsis');

describe('Test Suite: bEllipsis', function()
{
  var scope,
      $compile;

  function injectHTML(fontSize)
  {
    var body  = document.querySelector("body");
    body.innerHTML = '<div b-ellipsis style="font-size: ' + fontSize + '; width: 100px; height: 200px; margin-top: 0px; padding-top: 20px; padding-bottom: 20px;">' +
                     '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>' +
                     '</div>';

    $compile(body)(scope);

    var ellipsis = body.querySelector("[b-ellipsis]");

    return ellipsis;
  }

  beforeEach(angular.mock.module('bons.bEllipsis'));

  beforeEach(angular.mock.inject(['$rootScope','$compile',
      function ($rootScope, _$compile_)
      {
        scope = $rootScope.$new();
        $compile = _$compile_;
      }
    ])
  );

  it('should be defined', function()
  {
    expect(app).toBeDefined();
  });

  it('should have ellipsis at the end, if the text exceeds the div', function()
  {
    var ellipsis = injectHTML('10px');
    var match = ellipsis.innerHTML.match(/\.\.\.<\/p>/);

    expect(match).not.toBe(null);
  });

  it('shouldn\'t have ellipsis at the end, if the text does not exceeds the div', function()
  {
    var ellipsis = injectHTML('5px');
    var match = ellipsis.innerHTML.match(/\.\.\.<\/p>/);

    expect(match).toBe(null);
  });
});
