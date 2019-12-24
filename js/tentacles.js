const Tentacles = function() {
    const tentacle = new Tentacle();

    this.update = timeStep => {
        tentacle.update(timeStep);
    };

    this.draw = context => {
        context.save();
        context.translate(300, 300);

        tentacle.draw(context);

        context.restore();
    };
};