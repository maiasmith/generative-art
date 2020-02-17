const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
  dimensions: [ 2048, 2048 ], // could also use 'A4', 'A3', 'letter'
};

const sketch = () => {
  const palette = random.shuffle(random.pick(palettes)).slice(0, 3);

  const createGrid = () => {
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const frequency = 2;
        const radius = Math.abs(random.noise2D(u * frequency, v * frequency) * 0.02); // best to pass in u,v (more consistent) rather than x,y 
        points.push({
          color: random.pick(palette),
          radius,
          position: [ u , v ]
        })
      }
    }
    return points;
  }

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 300;

  // the render fn
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const { position, radius, color } = data;
      const [ u, v ] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
    })
  };
};

canvasSketch(sketch, settings);
