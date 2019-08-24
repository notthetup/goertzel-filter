(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GoertzelFilter = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
function GoertzelFilterASM(stdlib, foreign, heap){
  'use asm';

  var cos = stdlib.Math.cos;
  var PI = stdlib.Math.PI;
  var samplesArray = new stdlib.Float32Array(heap);

  var coefficient = 0.0;
  var length = 0;
  var targetFrequency = 0.0;

  function init(dFreq,sFreq,len){
    dFreq = +dFreq;
    sFreq = +sFreq;
    len = len | 0;

    length = len;

    coefficient= 2.0*cos(2.0*PI*dFreq/sFreq);
    targetFrequency = dFreq;
  }

  function run(){
    var index = 0;
    var prev0 = 0.0;
    var prev1 = 0.0;
    var s = 0.0;
    for(;(index|0) < (length|0); index=(index+1)|0){
      s = +samplesArray[index << 2 >> 2] + +(coefficient * prev0) - +prev1;
      prev1 = prev0;
      prev0 = s;
    }
    return ((prev1*prev1)+(prev0*prev0)-(coefficient*prev0*prev1))/+(length|0)/+(length|0);
  }

  return {
    init: init,
    run: run
  };
}

module.exports = function(){
  var targetFrequency = 0;
  var heapBuffer;
  var goertzelfilter;
  return {
    init: function(dFreq,sFreq,length){
      var stdlib;
      var heap = new ArrayBuffer(0x10000);
      heapBuffer =new Float32Array(heap);

      if (typeof window !== 'undefined'){
        stdlib = window;
      }else{
        stdlib = global;
      }

      targetFrequency = dFreq;
      goertzelfilter = GoertzelFilterASM(stdlib, {}, heap);
      goertzelfilter.init(dFreq,sFreq,length);
    },
    run: function(samples){
      heapBuffer.set(samples);
      return goertzelfilter.run();
    },
    targetFrequency: targetFrequency
  };
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});
