var gf = require('../index.js');

var frequency = 400;

var samples = [];

var sampleRate = 44100;
var length = 1*sampleRate;
var chunkSize = 128;

for(var index = 0; index < length; index++){
  samples[index] = Math.cos(2*Math.PI*frequency*index/length);
}

gf.init(200,sampleRate);

var numChunks = Math.floor(length/chunkSize);

for(cIndex = 0; cIndex < numChunks; cIndex++){
  var start = cIndex*chunkSize;
  var chunkSample = samples.slice(start,start+chunkSize);
  console.log(gf.run(chunkSample));
}
