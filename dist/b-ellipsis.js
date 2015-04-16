/* b-ellipsis - v0.1.0 - 2015-04-16
* https://github.com/bons/b-ellipsis
* Copyright (c) 2015 Bons; Licensed MIT */

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var MODULE_NAME = 'bons.bEllipsis';

var angular = require('angular');

function css(elm, attr)
{
  return window.getComputedStyle(elm, null).getPropertyValue(attr);
}

angular .module(MODULE_NAME, [])
        .directive('bEllipsis', function()
        {
          return {
            scope: true,
            transclude: true,
            template: "<p ellipsis-text ng-transclude></p>",
            link: function(scp, elm, atr)
            {
              var paddingHeigth = parseFloat(css(elm[0], "padding-top")) + parseFloat(css(elm[0], "padding-bottom"));
              var paddingWidth = parseFloat(css(elm[0], "padding-left")) + parseFloat(css(elm[0], "padding-right"));
              var inner = elm[0].querySelector("p[ellipsis-text]");
              var temp = inner.textContent || inner.innerText;
              var char = atr.char || "...";

              scp.trimmEllipsis = function()
              {
                if(!fontTooBig())
                {
                  return;
                }

                inner.innerText += char;
                while(fontTooBig())
                {
                  temp = temp.substring(0, temp.length-1);
                  insertText(inner, temp+char);
                }
              };

              scp.trimmEllipsis();

              function insertText(elm, str)
              {
                if(inner.textContent)
                {
                  inner.textContent = str;
                }
                else
                {
                  inner.innerText = str;
                }
              }
              function fontTooBig()
              {

                return (inner.offsetWidth > elm[0].offsetWidth - paddingWidth || inner.offsetHeight > elm[0].offsetHeight - paddingHeigth);
              }
            }
          };
        });

module.exports = MODULE_NAME;

},{"angular":"angular"}]},{},[1]);
