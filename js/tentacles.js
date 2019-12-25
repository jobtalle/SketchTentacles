const Tentacles = function() {
    const tentacles = new Array(Tentacles.ARMS);

    this.update = timeStep => {
        for (const tentacle of tentacles)
            tentacle.update(timeStep);
    };

    this.draw = context => {
        context.save();
        context.translate(300, 450);

        for (const tentacle of tentacles)
            tentacle.draw(context);

        context.restore();
    };

    for (let i = 0; i < tentacles.length; ++i)
        tentacles[i] = new Tentacle(
            50,
            i === 0 || i === tentacles.length - 1 ? 0 : 6,
            Math.PI * (-0.5 + (i / (tentacles.length - 1))));
};

Tentacles.ARMS = 7;