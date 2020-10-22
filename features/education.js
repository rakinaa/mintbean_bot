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

async function getSchool(schoolData, bot, message) {
  await bot.reply(message, {
    text: `Institution: ${schoolData.institution}`,
  });
  await bot.reply(message, {
    text: `Area: ${schoolData.area} - ${schoolData.studyType}`,
  });
  await bot.reply(message, {
    text: `Graduated: ${schoolData.endDate}`,
  });
  if (schoolData.gpa) {
    await bot.reply(message, {
      text: `GPA: ${schoolData.gpa}`,
    });
  }
  await bot.reply(message, getResponse(cv.education, [schoolData.name]));
}

let schools = cv.education.data

module.exports = function (controller) {
  controller.hears(new RegExp(/edu/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await bot.reply(message, getResponse(cv.education));
      }, 1000);
    });

  controller.hears(new RegExp(/app/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await getSchool(schools[0], bot, message)
      }, 1000);
    });

  controller.hears(new RegExp(/college/i), 'message', async (bot, message) => {
      await bot.reply(message, { type: 'typing' });
      setTimeout(async () => {
        await bot.changeContext(message.reference);
        await getSchool(schools[1], bot, message)
      }, 1000);
    });
}