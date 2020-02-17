# To run

```
npm i && canvas-sketch sketch.js --open
```

# To save drawing

Use the random seed in the suffix parameter - this random seed will be appended to the saved filename.

```
random.setSeed(random.getRandomSeed());

const settings = {
  suffix: random.getSeed(),
  dimensions: [ 2048, 2048 ], // could also use 'A4', 'A3', 'letter'
};
```

Use cmd-S to save an image to your filesystem.

Use cmd-K to save an image to your filesystem, and add a commit of that code. The hash of that commit will be appended to the filename.