Ultra-jank made-in-1-hour Discord fun bot which chops up a collection of screenshots into fourths, and recombines them
randomly to update server banners.

## Requirements
- Node 16
- discord.js 13 (run `npm install`)
- Imagemagick (`mogrify`, `convert` and `montage` in $PATH)
- A bot on the Discord API that has Manage Server and Send Messages/Files permissions

## Setup
- Change the `GUILD_ID`, `CHANNEL_ID` and `BOT_TOKEN` constants in `main.js` to yours
- Put all the images into the `images` folder. They should already be cropped to 16:9 aspect ratio, and aligned so that
  all the images roughly have the splits in the same locations
- Run `prepare.sh` to resize all the images and chop them up into quarters

## Running
- Run `node main.js`, which will randomly choose an image for each slot, combine them using `montage` and then upload it
  to the given server as the banner (and also post it in the given channel)
- Set up a cronjob with that command for regular banner updating

## Notes
- Due to the specific use of this bot (pictures from the Sing&Smile MV from SIFAS - the dots seperating the slots move,
  and not all screenshots are from exactly the same frame so they don't line up between different screenshots) the
  script doesn't actually use exact quarters. If you want to change the split locations for your use, simply modify the
  `crop` commands in `prepare.sh`
- The second `montage` is used to add a header so the server name displayed on the banner doesn't overlap the images. As
  for why I'm doing that in a seperate child process instead of piping it like I do with the first `montage`, I refer
  you to the "ultra-jank made-in-1-hour" part of the first sentence in this readme :)
- The example screenshots is an edit made by Epikkyu#1080
