const cv = require("./cv.json");

function getResponse(section, exclusions=[], canBack=true) {
  let filteredReplies = section.data
                            .filter(item => !exclusions.includes(item.name))
                            .map(item => ({
                              title: item.name,
                              payload: item.name
                            }));

  if (canBack) filteredReplies.push({title: "Go Back", payload: "Go Back"});

  return {
    text: section.intro,
    quick_replies: filteredReplies
  }
}

async function getJob(jobData, bot, message, overrideQR=false) {
  await bot.reply(message, {
    text: `Company: ${jobData.name}`,
  });
  await bot.reply(message, {
    text: `Title: ${jobData.position}`,
  });
  await bot.reply(message, {
    text: `Start/End: ${jobData.startDate} - ${jobData.endDate}`,
  });
  await bot.reply(message, {
    text: `Summary: ${jobData.summary}`,
  });

  if (!overrideQR) await bot.reply(message, getResponse(cv.work, [jobData.name]));
}

let positions = cv.work.data

module.exports = function (controller) {

  if (controller.adapter.name === 'Web Adapter') {
    controller.hears(new RegExp(/(experience)|(work)/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await bot.reply(message, getResponse(cv.work));
        }, 1000);
      });

    controller.hears(new RegExp(/USDA/i), 'message', async (bot, message) => { 
        await bot.reply(message, { type: 'typing' }); 
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await getJob(positions[1], bot, message)
        }, 1000);
      });

    controller.hears(new RegExp(/Wheat/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {

          await bot.changeContext(message.reference);
          await getJob(positions[0], bot, message)
        }, 1000);
      });

    controller.hears(new RegExp(/Ohio/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await getJob(positions[2], bot, message)
        }, 1000);
      });

    controller.hears(new RegExp(/Akron/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await getJob(positions[3], bot, message)
        }, 1000);
      });

    controller.hears(new RegExp(/(NC)|(North)|(Carolina)/i), 'message', async (bot, message) => {
        await bot.reply(message, { type: 'typing' });
        setTimeout(async () => {
          await bot.changeContext(message.reference);
          await getJob(positions[0], bot, message, true)
          await getJob(positions[1], bot, message, true)
          await bot.reply(message, getResponse(cv.work, [positions[0].name, positions[1].name]));
        }, 1000);
      });
  }
}