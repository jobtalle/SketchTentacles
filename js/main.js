const TIME_STEP_MAX = 0.1;

const wrapper = document.getElementById("wrapper");
const canvas = document.getElementById("renderer");
let tentacles = new Tentacles();
let lastDate = new Date();

const resize = () => {
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
};

const update = timeStep => {
    const context = canvas.getContext("2d");

    context.clearRect(0, 0, canvas.width, canvas.height);

    tentacles.update(Math.min(timeStep, TIME_STEP_MAX));
    tentacles.draw(context);
};

const loopFunction = () => {
    const date = new Date();

    update((date - lastDate) * 0.001);
    requestAnimationFrame(loopFunction);

    lastDate = date;
};

window.onresize = resize;

resize();
requestAnimationFrame(loopFunction);