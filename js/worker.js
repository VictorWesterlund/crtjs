let resolution = {
	width: 0,
	height: 0
};

// Gun/deflector angle
const pos = {
	x: 0,
	y: 0,
	get advance() {
		this.x++;

		// Hortizontal blank
		if(this.x == resolution.width) {
			this.x = 0;
			this.y++;
		}

		// Vertical blank
		if(this.y == resolution.height) {
			this.y = 0;
		}

		return {
			x: this.x,
			y: this.y
		}
	}
};

const refresh = 1; // Refresh rate
let clock;

function scanline() {
	self.postMessage(pos.advance);
}

self.addEventListener("message",event => {
	resolution = event.data;
	clock = setInterval(scanline,refresh);
});