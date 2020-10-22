const cv = require("./cv.json");

module.exports = function (controller) {
  if (controller.adapter.name === 'Web Adapter') {
    controller.hears(new RegExp(/social/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await bot.reply(message, {
            text: `You can view my work and credentials through the following links`,
          });
          for (let soc of cv.bio.profiles) {
            await bot.reply(message, {
              text: `${soc.network}: ${soc.url}`,
            });
          }
          await bot.reply(message, {
            quick_replies: cv.headers
          });
        }, 1000);
      });
  }
}