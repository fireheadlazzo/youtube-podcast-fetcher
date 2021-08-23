const fs = require('fs')
const internal = __dirname + "/internal";

exports.getChannelsFromCSV = () => {
    return fs.readFileSync(`${internal}/channels.csv`)
        .toString()
        .split('\n')
        .map(e => e.trim())
        .filter(l => l.length && l.length>0)
        .map(e => e.split(',')
        .map(e => e.trim()));
}

exports.init  = () => {
    fs.readdir(internal, function (err, files) {
        if (err) {
            console.log(err);
            return;
        }
        if (!files.includes("videos")) {
            console.warn("video directory does not exist. creating");
            fs.mkdir(`${internal}/videos`, (err) => {
                if (err) {
                    throw err;
                }
                console.log("DONE - created 'videos/'");
            });
        } else {
            console.log("CHECK - videos/")
        }
        if (!files.includes("archive.txt")) {
            console.warn("youtube-dl archive does not exist. creating new 'archive.txt'");
            fs.appendFile(`${internal}/archive.txt`,"", () => {
                console.log("DONE - archive.txt initialized");
            });
        } else {
            console.log("CHECK - archive.txt")
        }
        if (!files.includes("channels.csv")) {
            console.warn("channel file does not exist. creating new 'channels.csv'");
            fs.appendFile(`${internal}/channels.csv`,"\n", () => {
                console.log("DONE - channels.csv initialized");
            });
        } else {
            console.log("CHECK - channels.csv")
        }
        if (!files.includes("youtube.com_cookies.txt")) {
            console.warn("cookies file is missing. manual fix required");
            console.log("unexpected errors may occur without cookies file");
        } else {
            console.log("CHECK - youtube.com_cookies.txt")
        }
    });
    return Promise.resolve(true);
}
