const Particle = function(x, y) {
    const radius = Particle.RADIUS_MIN + (Particle.RADIUS_MAX - Particle.RADIUS_MIN) * Math.random();
    const vx = Particle.VX_MIN + (Particle.VX_MAX - Particle.VX_MIN) * Math.random();

    this.update = (timeStep, width, height) => {
        x += timeStep * vx;

        if (x > width + radius) {
            x -= width + radius + radius;
            y = Math.random() * height;
        }
    };

    this.draw = context => {
        context.beginPath();

        context.arc(x, y, radius, 0, Math.PI + Math.PI);

        context.fillStyle = Particle.COLOR;
        context.fill();
    };
};

Particle.COLOR = StyleUtils.getVariable("--color-particle");
Particle.RADIUS_MIN = 12;
Particle.RADIUS_MAX = 18;
Particle.VX_MIN = 26;
Particle.VX_MAX = 40;