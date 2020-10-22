const cv = require("./cv.json");

module.exports = function (controller) {
  if (controller.adapter.name === 'Web Adapter') {
    controller.hears(new RegExp(/skill/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await bot.reply(message, {
            text: `Through both my education and work experience, I've accumulated knowledge in the following technologies:`,
          });
          await bot.reply(message, {
            text: `${cv.skills.map(skill => skill.name).join(", ")}`,
            quick_replies: cv.headers
          });
        }, 1000);
      });
  }
}