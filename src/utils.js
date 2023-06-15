import * as THREE from "three";

export const makeTextSprite = (message) => {
  let fontFace = "Arial";
  let fontSize = 48;
  let textColor = { r: 0, g: 0, b: 0, a: 1.0 }; // set text color to black

  let canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");
  canvas.width = 256;
  canvas.height = 256;
  context.font = fontSize + "px " + fontFace;

  let metrics = context.measureText(message);
  let textWidth = metrics.width;

  context.fillStyle =
    "rgba(" +
    textColor.r +
    "," +
    textColor.g +
    "," +
    textColor.b +
    "," +
    textColor.a +
    ")";
  context.fillText(
    message,
    canvas.width / 2 - textWidth / 2,
    canvas.height / 2 + fontSize / 2 // adjust y to align text vertically
  );

  let texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
};
