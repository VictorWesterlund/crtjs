export class RasterScan {

	constructor(pixels) {
		this.pixels = pixels;
		this.signal = new Worker("./js/modules/Raster.mjs");

		this.signal.addEventListener("message",event => {
			this.fire(event.data);
		});
	}

	fire(pixel) {
		this.pixels[pixel.index].style.setProperty("background",pixel.color);
		//this.pixels[data.pixel].style.setProperty("animation",`decay 10ms ${data.pixel} linear forwards`);
	}

	load(headers) {
		this.signal.postMessage({
			type: "headers",
			payload: headers
		});
	}

	playstate(state) {
		this.signal.postMessage({
			type: "playstate",
			payload: state
		});
	}

}
