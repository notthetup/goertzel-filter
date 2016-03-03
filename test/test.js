var gf = require('../index.js');

var frequency = Math.random()*20000;
var offset = 1;
var sampleRate = 44100;
var length = 10*sampleRate;
var chunkSize = 128;

console.log("Freq: ", frequency);

var samples = new Float32Array(length);

for(var index = 0; index < length; index++){
  samples[index] = Math.cos(2*Math.PI*frequency*index/sampleRate);
}

// for(var index = 0; index < length; index++){
//   samples[index] = Math.random();
// }

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

var avg = getAvg(result);

var squareDiffs = result.map(function(value){
  var diff = value - avg;
  var sqr = diff * diff;
  return sqr;
});

var avgSquareDiff = getAvg(squareDiffs);
var stdDev = Math.sqrt(avgSquareDiff);

console.log("Max:", Math.max.apply(null, result),"Min:", Math.min.apply(null, result), "Avg:", avg, "Sig:", stdDev)
