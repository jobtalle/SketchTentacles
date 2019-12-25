const Particles = function(width, height) {
    const particles = new Array(Math.round(width * height * Particles.PARTICLES_PER_PIXEL));

    this.update = timeStep => {
        for (const particle of particles)
            particle.update(timeStep, width, height);
    };

    this.draw = context => {
        for (const particle of particles)
            particle.draw(context);
    };

    for (let i = 0; i < particles.length; ++i)
        particles[i] = new Particle(Math.random() * width, Math.random() * height);
};

Particles.PARTICLES_PER_PIXEL = 0.001;