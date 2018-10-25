# swipe-detect
[![npm](https://img.shields.io/npm/v/swipe-detect.svg)](https://www.npmjs.com/package/swipe-detect)
![CircleCI (all branches)](https://img.shields.io/circleci/project/github/mhfen/swipe-detect/master.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A touchevent swipe detection utility for JavaScript applications.

## Install

```bash
$ npm install --save swipe-detect
```
or
```bash
$ yarn add swipe-detect
```

## Usage

```javascript
import swipeDetect from 'swipe-detect';

swipeDetect(TARGET_DOM_NODE, YOUR_CALLBACK, THRESHOLD_FOR_SWIPE);
```

Where `TARGET_DOM_NODE` is the element you want to listen for swipes on, `YOUR_CALLBACK` is the function that should be called when a swipe occurs, and `THRESHOLD_FOR_SWIPE` is an `int` representing the pixels you want a swipe to gather before it is considered a swipe. Defaults to `150`.

The callback will receive either `'left'`, `'right'`, `'up'` or `'down'`.

## Contributing

Create an Issue if there is not already one created. Open up a Pull Request against `master` with your fix branch.

### Install Dependencies

```bash
$ npm install
```

### Run Tests

```bash
$ npm test
```
