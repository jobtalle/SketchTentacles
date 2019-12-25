const Tentacle = function(length, onset, direction) {
    const noise = cubicNoiseConfig(Math.random());
    const points = new Array(length << 2);
    let shift = 0;

    const updatePoints = () => {
        let x = 0;
        let y = 0;

        for (let i = 0; i < length; ++i) {
            const index = i << 2;
            const factor = i / (length - 1);
            const angle = (cubicNoiseSample1(noise, i * 0.2 + 10000 - shift) - 0.5) * 8 * factor +
                Math.pow(1 - factor, 5) * direction;
            const dx = Math.cos(angle);
            const dy = Math.sin(angle);
            const d = 16;

            x += dx * d;
            y += dy * d;

            points[index] = x;
            points[index + 1] = y;
            points[index + 2] = -dy;
            points[index + 3] = dx;
        }
    };

    this.update = timeStep => {
        shift += timeStep * 0.8;

        updatePoints();
    };

    this.draw = context => {
        context.beginPath();

        if (onset === 0)
            context.moveTo(0, 0);
        else
            context.moveTo(points[(onset - 1) << 2], points[((onset - 1) << 2) + 1]);

        for (let i = onset; i < length; ++i) {
            const index = i << 2;

            context.lineTo(
                points[index],
                points[index + 1]);
        }

        context.strokeStyle = Tentacle.COLOR;
        context.stroke();
    };
};

Tentacle.COLOR = "white";