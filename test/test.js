var gf = require('../index.js');

var frequency = 4000;
var offset = 0;
var sampleRate = 44100;
var length = 2*sampleRate;
var chunkSize = 128;

var samples = new Float32Array(length);

for(var index = 0; index < length; index++){
  samples[index] = Math.cos(2*Math.PI*frequency*index/sampleRate);
}

gf.init(frequency+offset,sampleRate, chunkSize);

var numChunks = Math.floor(length/chunkSize);

var result = [];

for(cIndex = 0; cIndex < numChunks; cIndex++){
  var start = cIndex*chunkSize;
  var chunkSample = samples.slice(start,start+chunkSize);
  result.push(gf.run(chunkSample));
}

function getAvg(values) {
  return values.reduce(function (p, c) {
    return p + c;
  }) / values.length;
}

console.log(getAvg(result), Math.max.apply(null, result),Math.min.apply(null, result))
