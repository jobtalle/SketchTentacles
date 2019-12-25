const Tentacles = function(width, height) {
    const tentacles = new Array(Tentacles.ARMS);
    const particles = new Particles(width, height);

    this.update = timeStep => {
        particles.update(timeStep);

        for (const tentacle of tentacles)
            tentacle.update(timeStep);
    };

    this.draw = context => {
        particles.draw(context);

        for (const tentacle of tentacles)
            tentacle.draw(context);
    };

    for (let i = 0; i < tentacles.length; ++i)
        tentacles[i] = new Tentacle(
            Math.round(canvas.width * 0.2),
            Math.round(canvas.height * 0.5),
            1000,
            15,
            Math.PI * (-0.5 + (i / (tentacles.length - 1))));
};

Tentacles.ARMS = 7;