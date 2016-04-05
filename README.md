# goertzel-filter

##### a [goertzel algorithm](https://en.wikipedia.org/wiki/Goertzel_algorithm) implementation optimized for asm.js

> The Goertzel algorithm is a Digital Signal Processing (DSP) technique that provides a means for __efficient__ evaluation of individual terms of the Discrete Fourier Transform (DFT),

-[Wikipedia](https://en.wikipedia.org/wiki/Goertzel_algorithm)

This package implements the goertzel algorithm in [asm.js](https://en.wikipedia.org/wiki/Asm.js). On browsers that support asm.js this package is designed to run as fast the math as possible. So it can be called repeatedly in real-time implementations such as [goertzel-node](https://github.com/notthetup/goertzel-node)

# Usage

`npm install goertzel-filter`


```js
var gf = require('goertzel-filter');

var frequencyToDetect = 440;
var sampleRate = 44100;
var chunkSize = 128;

gf.init(frequencyToDetect, sampleRate, chunkSize);

var sample = new Float32Array(chunkSize);
// fill up samples with some data here.

var result = gf.run(sample);

```

# API

## Methods

- `init` : Initializes the goertzel algorithm to detect a specific frequency, given a sampling rate and chunk size.
	- eg :
	```js
	gf.init(frequencyToDetect, sampleRate, chunkSize);
	```
	- arguments:
		- `frequencyToDetect` : __Number__ - The frequency (in Hz) to be detected.
		- `sampleRate` : __Number__ - Sampling rate of the signal being analyzed.
		- `chunkSize` : __Number__ - Length of data to be processed during each run of the algorithm.
    
- `run` : Run the goertzel algorithm on the given chunk of data to determine if it has any energy in the frequency to be detected. Returns the power of the signal in that frequency bucket. Can be called multiple times on the successive chunks of a stream of data.
	- eg :
	```js
	gf.run(sample);
	```
	- arguments:
		- `sample` : __Float32Array__ - An array of data to be analyzed. The size of the array has to be equal to the `chunkSize` used during the `init`.

  - return: Returns the power of the signal at `frequencyToDetect`. The higher the number the more (relative) power was detected at that frequency.


# License

MIT

See License file
