let field;
let clock;

let tape = {
	header: (data) => {
		clock = data.framerate;
		this.format = format;

		self.postMessage({
			type: "resolutionUpdate",
			data: resolution
		});
	},
	stream: []
}

async function fetchJSON(url) {
	const response = await fetch(url);
	return response.json();
}

function loadTape(ref) {
	fetchJSON(ref + "/header.json").then(data => tape.header(data));
	fetchJSON(ref + "/data.json").then(data => tape.stream = data);
}

self.addEventListener("message",event => {
	loadTape(event.data.tape);
});