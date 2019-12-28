const Tentacle = function(xOrigin, yOrigin, length, precision, direction, directionNeutral) {
    const steps = Math.ceil(length / precision);
    const noise = cubicNoiseConfig(Math.random());
    const points = new Array(steps << 2);
    let shift = 0;

    const getRadius = factor => {
        return (1 - factor) * length * Tentacle.RADIUS;
    };

    const updatePoints = () => {
        const d = length / steps;
        let x = xOrigin;
        let y = yOrigin;

        for (let i = 1; i < steps; ++i) {
            const index = i << 2;
            const factor = i / (steps - 1);
            const directionFactor = Math.pow(1 - factor, Tentacle.DIRECTION_POWER);
            const angle = (cubicNoiseSample1(noise, factor * 12 + 10000 - shift) - 0.5) * 8 * factor +
                directionFactor * direction + (1 - directionFactor) * directionNeutral;
            const dx = Math.cos(angle);
            const dy = Math.sin(angle);

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
        context.moveTo(points[(steps << 2) - 4], points[(steps << 2) - 3]);

        for (let i = steps - 1; i-- > 0;) {
            const index = i << 2;
            const radius = getRadius(i / (steps - 1));

            context.lineTo(
                points[index] + points[index + 2] * radius,
                points[index + 1] + points[index + 3] * radius);
        }

        for (let i = 0; i < steps - 1; ++i) {
            const index = i << 2;
            const radius = getRadius(i / (steps - 1));

            context.lineTo(
                points[index] - points[index + 2] * radius,
                points[index + 1] - points[index + 3] * radius);
        }

        context.closePath();
        context.fillStyle = Tentacle.COLOR;
        context.fill();
    };

    points[0] = xOrigin;
    points[1] = yOrigin;
    points[2] = -Math.sin(direction);
    points[3] = Math.cos(direction);
};

Tentacle.RADIUS = 0.018;
Tentacle.DIRECTION_POWER = 2;
Tentacle.COLOR = StyleUtils.getVariable("--color-arm");