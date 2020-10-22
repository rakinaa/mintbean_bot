/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const cv = require("./cv.json");

module.exports = function(controller) {

    controller.on('message,direct_message', async(bot, message) => {
        await bot.reply(message, {
            text: `Sorry, I can't answer that question, please try selecting one of the subjects below`,
            quick_replies: cv.headers
        });
    });

}
