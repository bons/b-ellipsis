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
