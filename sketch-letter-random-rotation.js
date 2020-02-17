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
    const count = 60;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const frequency = 1;
        const radius = Math.abs(random.noise2D(u * frequency, v * frequency) * 0.1); // best to pass in u,v (more consistent) rather than x,y 
        const rotation = random.noise2D(u * frequency, v * frequency);
        points.push({
          color: random.pick(palette),
          radius,
          position: [ u , v ],
          rotation
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
      const { position, radius, color, rotation } = data;
      const [ u, v ] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y); // will allow us to rotate from the grid coordinate (rather than top left of pg)
      context.rotate(rotation);
      context.fillText('-', 0, 0);
      context.restore();
    })
  };
};

canvasSketch(sketch, settings);
