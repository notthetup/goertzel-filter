function GoertzelFilterASM(stdlib, foreign, heap){
  "use asm";

  var cos = stdlib.Math.cos;
  var PI = stdlib.Math.PI;
  var samplesArray = new stdlib.Float32Array(heap);

  var prev0 = 0.0;
  var prev1 = 0.0;
  var coefficient = 0.0;
  var length = 0;
  var targetFrequency = 0.0;

  function init(dFreq,sFreq,len){
    dFreq = +dFreq;
    sFreq = +sFreq;
    len = len | 0;

    length = len;

    prev0 = +0;
    prev1 = +0;
    coefficient= 2.0*cos(2.0*PI*dFreq/sFreq);
    targetFrequency = dFreq;
  }

  function run(){
    var index = 0;
    var s = 0.0;
    for(;(index|0) < (length|0); index=(index+1)|0){
      s = +samplesArray[index << 2 >> 2] + +(coefficient * prev0) - +prev1;
      prev1 = prev0;
      prev0 = s;
    }
    return ((prev1*prev1)+(prev0*prev0)-(coefficient*prev0*prev1))/+(length|0)/2.0;
  }

  return {
    init: init,
    run: run
  }
}

var targetFrequency = 0;
var heapBuffer;

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

    targetFrequency = dFreq;
    goertzelfilter = GoertzelFilterASM(stdlib, {}, heap);
    goertzelfilter.init(dFreq,sFreq,length);
  },
  run: function(samples){
    heapBuffer.set(samples);
    return goertzelfilter.run();
  },
  targetFrequency: targetFrequency
}
