/**
* Copyright 2022, Suyooo
* 
* Copying and distribution of this file, with or without modification, are permitted in any medium without royalty, provided the copyright notice and this notice are preserved. This file is offered as-is, without any warranty.
**/

"use strict";

const GUILD_ID = "A";
const CHANNEL_ID = "B";
const BOT_TOKEN = "C";

const { Client, Intents } = require("discord.js");
const proc = require("child_process");
const fs = require("fs");

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    makeBanner().then(() => {
        client.guilds.fetch(GUILD_ID).then(g => {
            Promise.all([
                g.setBanner("out2.png"),
                g.channels.fetch(CHANNEL_ID).then(c => c.send({content: "Server banner updated!", files: ["out2.png"]}))
            ]).then(() => process.exit(0));
        }).catch(console.log);
    });
});

function makeBanner() {
    let files = fs.readdirSync("slot1");
    let slot1 = files[Math.floor(Math.random() * files.length)];
    let slot2 = files[Math.floor(Math.random() * files.length)];
    let slot3 = files[Math.floor(Math.random() * files.length)];
    let slot4 = files[Math.floor(Math.random() * files.length)];
    fs.unlinkSync("out.png");
    fs.unlinkSync("out2.png");

    let child = proc.exec("montage slot1/"+slot1+" slot2/"+slot2+" slot3/"+slot3+" slot4/"+slot4+" -tile 4x1 -geometry +0+0 png:- | convert -crop 960x348+0+0 png:- out.png");
    child.stdout.pipe(process.stdout);
    return new Promise(resolve => {
        child.on("exit", function() {
            let child2 = proc.exec("montage header.png out.png -tile 1x2 -geometry +0+0 out2.png")
            child2.stdout.pipe(process.stdout);
            child2.on("exit", function() {
                resolve();
            })
        })
    });
}

client.login(BOT_TOKEN);
