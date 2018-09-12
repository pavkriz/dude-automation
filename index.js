var exec = require('child_process').exec;
var fs = require('fs');

var config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
var content = fs.readFileSync('devices.tsv', 'utf8');
var rows = content.split("\n").length;

function spawnBatch(startAtIndex) {
    if (startAtIndex < rows) {
        console.log('===== PROCESSING BATCH (SIZE ' + config.batch_size + ') AT ROW ' + (startAtIndex+1) + ' =====');
        var child = exec('./node_modules/.bin/casperjs casper-script.js ' + startAtIndex + ' ' + config.batch_size, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            console.log('===== DONE =====');
        });
        child.on('close', () => {
            spawnBatch(startAtIndex + config.batch_size);
        });
    }
}
spawnBatch(0);
