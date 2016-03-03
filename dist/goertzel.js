(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GoertzelFilter = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
function GoertzelFilterASM(stdlib, foreign, heap){
  "use asm";

  var cos = stdlib.Math.cos;
  var PI = stdlib.Math.PI;
  var samplesArray = new stdlib.Float32Array(heap);

  var prev0 = 0.0;
  var prev1 = 0.0;
  var coefficient = 0.0;
  var length = 0;

  function init(dFreq,sFreq,len){
    dFreq = +dFreq;
    sFreq = +sFreq;
    len = len | 0;

    length = len;

    prev0 = +0;
    prev1 = +0;
    coefficient= 2.0*cos(2.0*PI*dFreq/sFreq)
  }

  function run(){
    var index = 0;
    var s = 0.0;
    for(;(index|0) < (length|0); index=(index+1)|0){
      s = +samplesArray[index << 2 >> 2] + +(coefficient * prev0) - +prev1;
      prev1 = prev0;
      prev0 = s;
    }
    return ((prev1*prev1)+(prev0*prev0)-(coefficient*prev0*prev1))/+(length|0)/2;
  }

  return {
    init: init,
    run: run
  }
}

module.exports = {
  init: function(dFreq,sFreq,length){
    var stdlib;
    var heap = new ArrayBuffer(0x10000);
    heapBuffer =new Float32Array(heap);

    if (typeof window !== 'undefined'){
      stdlib = window;
    }else{
      stdlib = global;
    }
    goertzelfilter = GoertzelFilterASM(stdlib, {}, heap);
    goertzelfilter.init(dFreq,sFreq,length);
  },
  run: function(samples){
    heapBuffer.set(samples);
    return goertzelfilter.run();
  }
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1])(1)
});