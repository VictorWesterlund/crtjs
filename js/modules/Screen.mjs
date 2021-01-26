export class FluorescentScreen {

	constructor(screen) {
		this.screen = screen;
		this.pixels = [];
		
		this.destroyPixels();
		this.spawnPixels();
	}

	createMatrix() {
		this.screen.style.setProperty("grid-template-columns",`repeat(${this.screen.clientWidth},1px)`);
		this.screen.style.setProperty("grid-template-rows",`repeat(${this.screen.clientHeight},1px)`);
	}

	spawnPixels() {
		const density = this.screen.clientWidth * this.screen.clientHeight;

		for(let i = 0; i < density; i++) {
			const pixel = document.createElement("div");
			pixel.classList.add("pixel");
			
			this.screen.appendChild(pixel);
			this.pixels.push(pixel);
		}

		this.createMatrix();
	}

	destroyPixels() {
		while(this.screen.firstChild) {
			this.screen.removeChild(this.screen.lastChild);
		}
	}

}
