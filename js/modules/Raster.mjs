let meta = {
	fields: 0,
	pixels: 0,
	framerate: 100
};

let clock = null;

let tape = null;
let stream = (stream) => {
	meta.fields = Math.floor(stream.length / meta.pixels);
	tape = stream;
	return true;
}

async function fetchJSON(url) {
	const response = await fetch(url);
	return response.json();
}

function scan() {
	let pixel = 0;

	for(let head = 0; head < tape.length; head++) {
		if(pixel == meta.pixels) {
			pixel = 0;
		}

		self.postMessage({
			index: pixel,
			color: tape[head]
		});

		pixel++;
	}
}

function playstate(state) {
	if(state == "play") {
		clock = setInterval(scan,meta.framerate);
		return;
	}
	clock = null;
}

self.addEventListener("message",event => {
	const payload = event.data.payload;

	switch(event.data.type) {
		case "headers":
			meta.pixels = payload.resolution[0] * payload.resolution[1];
			meta.framerate = payload.framerate;

			const segmentURL = new Array("../../tapes",payload.manifest,payload.segments[0]).join("/");
			fetchJSON(segmentURL).then(tape => stream(tape));
			break;

		case "playstate":
			playstate(payload);
			break;

		default: console.warn("Unknown instruction: " + event.data.type); break;
	}
});
