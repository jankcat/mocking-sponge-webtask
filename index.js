"use strict";
const request = require("request");

module.exports = function (context, callback) {
	// Retrieve and prepare the user's message
	const message = context.query.message || "You Done Messed Up A-Aron!";
	const spongifiedString = spongify(message);
	
	// ImgFlip API setup
	const imgFlipUsername = context.secrets.imgFlipUsername || "";
	const imgFlipPassword = context.secrets.imgFlipPassword || "";

	// Generate the meme
	getImage(imgFlipUsername, imgFlipPassword, spongifiedString, function (err, body) {
		if (body) {
			callback(null, body);
		} else if (err) {
			callback(null, err);
		} else {
			callback(null, "OOPSIE WOOPSIE!! Uwu We made a fucky wucky!!");
		}
	});
}

function getImage(username, password, message, callback) {
	// Prepare request
	const data = {
		template_id: 102156234,
		username,
		password,
		text0: "",
		text1: message,
	};
	// Send request to API
	request.post(
		{
			url: "https://api.imgflip.com/caption_image",
			form: data,
		},
		function (err, httpResponse, body) {
			if (err) return callback(err);
			var bodyObj = {};
			try {
				bodyObj = JSON.parse(body);
			} catch (e) {
				return callback(e);
			}
			if (!bodyObj.success) return callback(bodyObj.error_message);
			callback(null, bodyObj.data.url);
		}
	);
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