import { FluorescentScreen } from "./modules/Screen.mjs";
import { RasterScan } from "./modules/ElectronGun.mjs";

class CRT {

	constructor(element) {
		this.element = element;
		this.initScreen();
		this.raster = new RasterScan(this.screen.pixels);
	}

	async fetchJSON(url) {
		const response = await fetch(url);
		return response.json();
	}

	loadTape(ref) {
		this.fetchJSON(ref + "/header.json").then(headers => {
			// Reinitialize player with resolution from tape header
			if(headers.resolution[0] !== this.element.clientWidth || headers.resolution[1] !== this.element.clientHeight) {
				this.element.style.setProperty("width",headers.resolution[0] + "px");
				this.element.style.setProperty("height",headers.resolution[1] + "px");
				this.initScreen();
				this.raster.pixels = this.screen.pixels;
			}

			this.raster.load(headers);
		});
	}

	play() {
		this.raster.playstate("play");
	}

	initScreen() {
		this.screen = new FluorescentScreen(this.element);
	}

}

window.video = new CRT(document.getElementById("screen"));
window.video.loadTape("tapes/sample");
window.video.play();
