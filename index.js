const Imgflipper = require("imgflipper");
const spongify = require('spongify').convert;

module.exports = function (context, callback) {
	// Retrieve and prepare the user's message
	const message = context.query.message || "You Done Messed Up A-Aron!";
	const spongifiedString = spongify(message);
	
	// ImgFlip API setup
	const imgFlipUsername = context.secrets.imgFlipUsername | "";
	const imgFlipPassword = context.secrets.imgFlipPassword | "";
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
