const Tentacle = function() {
    const noise = cubicNoiseConfig(Math.random());
    let shift = 0;

    this.update = timeStep => {
        shift += timeStep * 0.7;
    };

    this.draw = context => {
        let angle = 0;
        let x = 0;
        let y = 0;

        context.beginPath();
        context.moveTo(0, 0);

        const l = 30;
        const s = 0.2;

        for (let i = 0; i < l; ++i) {
            const f = Math.pow(i / l, 1);

            angle += (cubicNoiseSample1(noise, i * s + shift) - 0.5) * 5 * f;

            const d = 12;

            x += Math.cos(angle) * d;
            y += Math.sin(angle) * d;

            context.lineTo(x, y);
        }

        context.strokeStyle = "blue";
        context.stroke();
    };
};