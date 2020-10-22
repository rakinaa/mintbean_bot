const cv = require("./cv.json");

module.exports = function (controller) {
  controller.hears(new RegExp(/back/i), 'message', async (bot, message) => {
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          quick_replies: cv.headers
        });
      }, 500);
    });
}