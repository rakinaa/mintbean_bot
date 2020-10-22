const cv = require("./cv.json");

module.exports = function (controller) {
  if (controller.adapter.name === 'Web Adapter') {
    controller.hears(new RegExp(/back/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await bot.reply(message, {
            quick_replies: cv.headers
          });
        }, 500);
      });
  }
}