const Tentacle = function(xOrigin, yOrigin, length, precision, direction, directionNeutral) {
    const steps = Math.max(Tentacle.STEPS_MIN, Math.ceil(length / precision));
    const noise = cubicNoiseConfig(Math.random());
    const points = new Array(steps << 2);
    const radii = [];
    let shift = 0;
    let pulseTime = Tentacle.PULSE_TIME_MAX * Math.random();
    let pulseDist = 1;

    const getRadius = factor => {
        const radius = (1 - factor) * length * Tentacle.RADIUS;

        if (factor > Tentacle.TAIL_START)
            return Math.max(radius, (factor - Tentacle.TAIL_START) / (1 - Tentacle.TAIL_START) * length * Tentacle.RADIUS_TAIL);

        return radius;
    };

    const updatePoints = () => {
        const d = length / steps;
        let x = xOrigin;
        let y = yOrigin;

        for (let i = 1; i < steps; ++i) {
            const index = i << 2;
            const factor = i / (steps - 1);
            const directionFactor = Math.pow(1 - factor, Tentacle.DIRECTION_POWER);
            const angle = (cubicNoiseSample1(noise, (1 - factor) * Tentacle.NOISE_FREQUENCY + shift) - 0.5) * Tentacle.NOISE_SCALE * factor +
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

        if ((pulseTime -= timeStep) < 0 && pulseDist >= 1) {
            pulseTime = Tentacle.PULSE_TIME_MIN + (Tentacle.PULSE_TIME_MAX - Tentacle.PULSE_TIME_MIN) * Math.random();
            pulseDist = 0;
        }

        if (pulseDist < 1)
            pulseDist += Tentacle.PULSE_SPEED * timeStep;
    };

    this.draw = context => {
        if (pulseDist < 1) {
            const pulseIndexDist = pulseDist * (1 + Tentacle.PULSE_COOLDOWN);
            const pulseIndex = Math.min(Math.floor(steps * pulseIndexDist), steps - 3);
            const pulseLerp = Math.min(1, steps * pulseIndexDist - pulseIndex);
            const pulseX = points[pulseIndex << 2] * (1 - pulseLerp) + pulseLerp * points[(pulseIndex + 1) << 2];
            const pulseY = points[(pulseIndex << 2) + 1] * (1 - pulseLerp) + pulseLerp * points[((pulseIndex + 1) << 2) + 1];
            const pulseRadius = Tentacle.PULSE_RADIUS * length * (
                pulseIndexDist > 1 ?
                Math.pow(1 - (pulseIndexDist - 1) / Tentacle.PULSE_COOLDOWN, Tentacle.PULSE_COOLDOWN_POWER) :
                (Math.min(Tentacle.PULSE_RADIUS_MAX, pulseIndexDist) /  Tentacle.PULSE_RADIUS_MAX));
            const gradient = context.createRadialGradient(
                pulseX, pulseY,
                0,
                pulseX, pulseY,
                Math.min(Math.random() < Tentacle.BLINK_CHANCE ? Tentacle.BLINK_RADIUS : pulseRadius, pulseRadius));

            gradient.addColorStop(0, Tentacle.COLOR_PULSE);
            gradient.addColorStop(1, Tentacle.COLOR);

            context.fillStyle = gradient;
        }
        else
            context.fillStyle = Tentacle.COLOR;

        context.beginPath();
        context.moveTo(points[(steps << 2) - 4], points[(steps << 2) - 3]);

        for (let i = steps - 1; i-- > 0;) {
            const index = i << 2;
            const radius = radii[i];

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
        context.fill();
    };

    points[0] = xOrigin;
    points[1] = yOrigin;
    points[2] = -Math.sin(direction);
    points[3] = Math.cos(direction);

    for (let i = 0; i < steps; ++i)
        radii.push(getRadius(i / (steps - 1)));
};

Tentacle.NOISE_FREQUENCY = 12;
Tentacle.NOISE_SCALE = 8;
Tentacle.BLINK_CHANCE = 0.2;
Tentacle.BLINK_RADIUS = 0.1;
Tentacle.PULSE_SPEED = 1;
Tentacle.PULSE_COOLDOWN_POWER = 0.7;
Tentacle.PULSE_TIME_MIN = 2;
Tentacle.PULSE_TIME_MAX = 16;
Tentacle.STEPS_MIN = 70;
Tentacle.RADIUS = 0.018;
Tentacle.RADIUS_TAIL = 0.01;
Tentacle.TAIL_START = 0.92;
Tentacle.DIRECTION_POWER = 2.5;
Tentacle.COLOR = StyleUtils.getVariable("--color-arm");
Tentacle.COLOR_PULSE = StyleUtils.getVariable("--color-pulse");
Tentacle.PULSE_RADIUS = 0.2;
Tentacle.PULSE_RADIUS_MAX = 0.65;
Tentacle.PULSE_COOLDOWN = 0.8;