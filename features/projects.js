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

async function getProject(projectData, bot, message) {
  await bot.reply(message, {
    text: `Title: ${projectData.name}`,
  });
  await bot.reply(message, {
    text: `Role: ${projectData.role}`,
  });
  await bot.reply(message, {
    text: `Summary: ${projectData.summary}`,
  });
  await bot.reply(message, {
    text: `Live Link: ${projectData.live}`,
  });
  await bot.reply(message, {
    text: `github: ${projectData.github}`,
  });

  await bot.reply(message, getResponse(cv.projects, [projectData.name]));
}

let projects = cv.projects.data

module.exports = function (controller) {
  controller.hears(new RegExp(/project/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await bot.reply(message, getResponse(cv.projects));
      }, 1000);
    });

  controller.hears(new RegExp(/green/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await getProject(projects[0], bot, message)
      }, 1000);
    });

  controller.hears(new RegExp(/pict/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await getProject(projects[1], bot, message)
      }, 1000);
    });

  controller.hears(new RegExp(/(seam)|(carve)/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await getProject(projects[2], bot, message)
      }, 1000);
    });
}