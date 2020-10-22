const cv = require("./cv.json");

module.exports = function (controller) {
  controller.hears(new RegExp(/about/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await bot.reply(message, {
          text: `Hi, my name in Rakin Rouf`,
        });
        await bot.reply(message, {
          text: `${cv.bio.summary}`,
          quick_replies: cv.headers
        });
      }, 500);
    });
}