const worker = new Worker("js/worker.js");

// Electron
const ray = {
	electron: document.getElementById("electron"),
	get size() {
		const size = getComputedStyle(this.electron).getPropertyValue("--size");
		return parseInt(size);
	},
	set size(value) {
		this.electron.style.setProperty("--size",value + "px");
		this.value = value;
	}
}

ray.size = 50;

// Screen resolution
const resolution = {
	width: 4,
	height: 5
};

// Aim electron gun at pixel
function aim(x,y) {
	const translate = `${x * ray.size}px,${y * ray.size}px`;
	ray.electron.style.setProperty("transform",`translate(${translate})`);
}

// Clock
worker.postMessage(resolution);
worker.addEventListener("message",event => {
	aim(event.data.x,event.data.y);
});