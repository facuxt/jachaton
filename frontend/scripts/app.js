'use strict';
  /*! angular-count-to 2013-07-16 */
var countTo=angular.module("countTo",[]).directive("countTo",["$timeout",function(a){return{replace:!1,scope:!0,link:function(b,c,d){var e,f,g,h,i,j,k,l=c[0],m=function(){f=30,i=0,b.timoutId=null,j=parseInt(d.countTo)||0,b.value=parseInt(d.value,10)||0,g=1e3*parseFloat(d.duration)||0,h=Math.ceil(g/f),k=(j-b.value)/h,e=b.value},n=function(){b.timoutId=a(function(){e+=k,i++,i>=h?(a.cancel(b.timoutId),e=j,l.innerText=j):(l.innerText=Math.round(e),n())},f)},o=function(){b.timoutId&&a.cancel(b.timoutId),m(),n()};return d.$observe("countTo",function(a){a&&o()}),d.$observe("value",function(){o()}),!0}}}]);

var app = angular.module('app', [
    'ngAnimate',
    'ngMessages',
    'ngMaterial',
    'ui.router',
    'ui.bootstrap',
    'ui.load',
    'oc.lazyLoad',
    'countTo'
  ]);

