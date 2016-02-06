/*
var gf = require('goertzel-filter');
gf.init(44100, 400);
gf.run(samples)

*/


module.exports = {
  prev0: 0,
  prev1: 0,
  coefficient: 2*Math.cos(2*Math.PI*400/44100),
  init: function(dFreq,sFreq){
    if (!sFreq){
      sFreq = 44100;
    }

    if (!dFreq){
      dFreq = 400;
    }
    this.coefficient= 2*Math.cos(2*Math.PI*dFreq/sFreq)
  },
  run: function(samples){
    "use asm";
    var index = 0;
    for(index=0; index < samples.length; index++){
      var s = samples[index] + (this.coefficient * this.prev0) - this.prev1;
      this.prev1 = this.prev0;
      this.prev0 = s;
    }
    return ((this.prev1*this.prev1)+(this.prev0*this.prev0)-(this.coefficient*this.prev0*this.prev1))/samples.length/samples.length;
  }
}
