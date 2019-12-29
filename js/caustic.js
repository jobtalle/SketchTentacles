const Caustic = function(x, width, height, timeFactor = 1) {
    const thickness = width * (Caustic.THICKNESS_MIN + (Caustic.THICKNESS_MAX - Caustic.THICKNESS_MIN) * Math.random());
    const depth = Caustic.DEPTH * height;
    const xSpeed = width * (Caustic.XSPEED_MIN + (Caustic.XSPEED_MAX - Caustic.XSPEED_MIN) * Math.random());
    const speed = Caustic.SPEED_MIN + (Caustic.SPEED_MAX - Caustic.SPEED_MIN) * Math.random();
    let life = timeFactor;

    this.update = timeStep => {
        x += xSpeed * timeStep;

        if ((life -= timeStep / speed) < 0) {
            life = 1;
            x = Math.random() * (width + thickness) - thickness;
        }
    };

    this.draw = context => {
        const alpha = Caustic.ALPHA * (0.5 - Math.cos(life * Math.PI * 2) * 0.5);
        const gradient = context.createLinearGradient(0, 0, 0, depth);

        gradient.addColorStop(0, "rgba(161, 201, 255, " + alpha + ")");
        gradient.addColorStop(Math.pow(0.5 - Math.cos(life * Math.PI * 2) * 0.5, Caustic.POWER), "rgba(156, 217, 255, 0)");

        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x - depth * Caustic.SHEAR, depth);
        context.lineTo(x - depth * Caustic.SHEAR + thickness, depth);
        context.lineTo(x + thickness, 0);
        context.fillStyle = gradient;
        context.fill();
    };
};

Caustic.XSPEED_MIN = 0.004;
Caustic.XSPEED_MAX = 0.01;
Caustic.SPEED_MIN = 3;
Caustic.SPEED_MAX = 9;
Caustic.ALPHA = 0.3;
Caustic.THICKNESS_MIN = 0.01;
Caustic.THICKNESS_MAX = 0.06;
Caustic.DEPTH = 0.8;
Caustic.SHEAR = 0.2;
Caustic.POWER = 0.5;