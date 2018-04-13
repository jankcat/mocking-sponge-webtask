"use strict";

const Imgflipper = require("imgflipper");

module.exports = function (context, callback) {
	// Retrieve and prepare the user's message
	const message = context.query.message || "You Done Messed Up A-Aron!";
	const spongifiedString = spongify(message);
	
	// ImgFlip API setup
	const imgFlipUsername = context.secrets.imgFlipUsername || "";
	const imgFlipPassword = context.secrets.imgFlipPassword || "";
	const imgflipper = new Imgflipper(imgFlipUsername, imgFlipPassword);
	
	// Generate the meme
	imgflipper.generateMeme(102156234, "", spongifiedString, function (err, url) {
		if (err) {
			callback(null, err);
		} else if (url) {
			callback(null, url);
		} else {
			callback(null, "OOPSIE WOOPSIE!! Uwu We made a fucky wucky!!");
		}
	});
}

function spongify(message) {
    let spongified = "";
    let upper = true;
	// only letters, not spaces etc.
    let regexp = /[a-zA-Z]/;
	
	for (let i of message) {
      if (!upper && i.match(regexp) !== null) {
        i = i.toLowerCase();
        upper = true;
      } else if (i.match(regexp) !== null) {
        i = i.toUpperCase();
        upper = false;
      }
      spongified += i;
    }
	return spongified;
}