import { FluorescentScreen } from "./modules/Screen.mjs";
import { RasterScan } from "./modules/Gun.mjs";

const screen = new FluorescentScreen(document.getElementById("screen"));

const CRT = new RasterScan(screen.pixels);
CRT.load("../../tapes/sample");