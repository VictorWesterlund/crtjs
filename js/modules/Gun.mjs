export class RasterScan {

	constructor(pixels) {
		this.pixels = pixels;
		this.coils = new Worker("./js/modules/Raster.mjs");

		this.coils.addEventListener("message",event => {
			this.fire(event.data);
		});
	}

	fire(data) {
		this.pixels[data.pixel].style.setProperty("background",data.color);
		this.pixels[data.pixel].style.setProperty("animation",`decay 10ms ${data.pixel} linear forwards`);
	}

	load(tape) {
		this.coils.postMessage({
			density: this.pixels.length,
			tape: tape
		});
	}

}