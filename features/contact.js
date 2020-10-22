const cv = require("./cv.json");

module.exports = function (controller) {
  if (controller.adapter.name === 'Web Adapter') {
    controller.hears(new RegExp(/contact/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await bot.reply(message, {
            text: `You can contact me through the following`,
          });
          await bot.reply(message, {
            text: `Phone: 919-909-7373`,
          });
          await bot.reply(message, {
            text: `Email: rakinr57@gmail.com`,
          });
          await bot.reply(message, {
            text: `LinkedIn: https://www.linkedin.com/in/rakin-rouf-6607b21a4/`,
            quick_replies: cv.headers
          });
        }, 500);
      });
  }
}