const Tentacles = function(width, height) {
    const tentacles = new Array(Tentacles.ARMS);
    const caustics = new Caustics(width, height);

    this.update = timeStep => {
        for (const tentacle of tentacles)
            tentacle.update(timeStep);

        caustics.update(timeStep);
    };

    this.draw = context => {
        for (const tentacle of tentacles)
            tentacle.draw(context);

        caustics.draw(context);
    };

    for (let i = 0; i < tentacles.length; ++i)
        tentacles[i] = new Tentacle(
            Math.round(canvas.width * Tentacles.X),
            Math.round(canvas.height * Tentacles.Y),
            width * 0.6,
            15,
            Math.PI * (i / (tentacles.length - 1)),
            0);
};

Tentacles.ARMS = 8;
Tentacles.X = 0.3;
Tentacles.Y = 0.22;