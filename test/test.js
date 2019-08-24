var GF = require('../index.js');

var frequency = Math.random()*20000;
var offset =0.001*frequency;
var sampleRate = 44100;
var length = sampleRate;
var chunkSize = 512;

function runExp(samples){
  var result = [];

  var gf = GF();
  gf.init(frequency+offset,sampleRate, chunkSize);

  var numChunks = Math.floor(length/chunkSize);

  for(var cIndex = 0; cIndex < numChunks; cIndex++){
    var start = cIndex*chunkSize;
    var chunkSample = samples.slice(start,start+chunkSize);
    result.push(gf.run(chunkSample));
  }

  return result;
}

function generateStats(result){

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

  return {
    'avg' : avg,
    'stdDev' : stdDev
  };
}

console.log('Generated Freq: ', frequency);
console.log('Offset: ', offset);

var samples = new Float32Array(length);

for(var index = 0; index < length; index++){
  samples[index] = Math.cos(2*Math.PI*frequency*index/sampleRate);
}

var results = runExp(samples);
var stats = generateStats(results);
console.log('With signal : max:', Math.max.apply(null, results),'min:', Math.min.apply(null, results), 'Avg:', stats.avg, 'Sig:', stats.stdDev);


for(index = 0; index < length; index++){
  samples[index] = Math.random();
}

results = runExp(samples);
stats = generateStats(results);
console.log('With noise : max:', Math.max.apply(null, results),'min:', Math.min.apply(null, results), 'Avg:', stats.avg, 'Sig:', stats.stdDev);


var freqs = [parseInt(Math.random()*20000), parseInt(Math.random()*20000)];
const selFreq = freqs[parseInt(Math.random()+0.5)];

for(index = 0; index < length; index++){
  samples[index] = Math.cos(2*Math.PI*selFreq*index/sampleRate);
}

console.log('Generated Freqs: ', freqs);
console.log('Selected Freq: ', selFreq);

function runMultiple(samples, tfreq1, tfreq2){
  var result1 = [];
  var result2 = [];

  var gf1 = GF();
  var gf2 = GF();
  gf1.init(tfreq1,sampleRate, chunkSize);
  gf2.init(tfreq2,sampleRate, chunkSize);

  var numChunks = Math.floor(length/chunkSize);

  for(var cIndex = 0; cIndex < numChunks; cIndex++){
    var start = cIndex*chunkSize;
    var chunkSample = samples.slice(start,start+chunkSize);
    result1.push(gf1.run(chunkSample));
    result2.push(gf2.run(chunkSample));
  }
  return [result1, result2];
}

results = runMultiple(samples, ...freqs);
var stats1 = generateStats(results[0]);
var stats2 = generateStats(results[1]);

console.log('With freq ' + freqs[0] + ' : max:', Math.max.apply(null, results[0]),'min:', Math.min.apply(null, results[0]), 'Avg:', stats1.avg, 'Sig:', stats1.stdDev);

console.log('With freq ' + freqs[1] + ' : max:', Math.max.apply(null, results[1]),'min:', Math.min.apply(null, results[1]), 'Avg:', stats2.avg, 'Sig:', stats2.stdDev);

if (stats1.avg > stats2.avg && freqs[0] == selFreq){
  console.log('Yay!!');
} else if (stats1.avg < stats2.avg && freqs[1] == selFreq){
  console.log("Yay!!");
} else{
  console.log('Noooo!!');
}
