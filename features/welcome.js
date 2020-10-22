const cv = require("./cv.json");

module.exports = function (controller) {
  controller.on("hello", welcome);
  controller.on("welcome_back", welcome);

  function welcome(bot, message) {
    bot.reply(message, {
      text: "Greetings, I'm Rakin Rouf's resume chat bot.",
    });
    bot.reply(message, {
      text: "Feel free to ask about any of the subjects below to find out more about Rakin.",
      quick_replies: cv.headers,
    });
  }
}