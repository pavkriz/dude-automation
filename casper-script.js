var casper = require('casper').create();
var fs = require('fs'); // this is Phantomjs's fs module, not Nodejs's ! Dffferent API!!!
var addDevice = require('./src/addDevice.js');

var args = casper.cli.args;
var startAtRow = 0;
var batchSize = 1000000000000;
if (args.length >= 2) {
    startAtRow = args[0];
    batchSize = args[1];
}

var config = JSON.parse(fs.read('config.json'));
var content = fs.read('devices.tsv');

casper.on('step.error', function(err) {
    casper.page.evaluate(function() {
        document.body.bgColor = 'white';
    });
    casper.captureSelector("screenshots/error.png", "html");
    this.die("Step failed: " + err + " See error.png for more info");
});
//casper
//    .on("error", function(msg){ console.log("error: " + msg, "ERROR") })
//    .on("page.error", function(msg, trace){ console.log("Page Error: " + msg, "ERROR") })
casper.on("remote.message", function(msg){ console.log("Info: " + msg, "INFO") });

casper.options.waitTimeout = content.split("\n").length * 20000; // 20s per operation
casper.options.verbose = true;
casper.options.logLevel ="debug";
casper.options.viewportSize = {width: 1280, height: 600};

casper.start('http://' + config.dude_ip + '/webfig/', function () {
    // Wait for the page to be loaded (login button)
    casper.waitForSelector('a#dologin');
});

casper.wait(2000, function() {
    casper.captureSelector("screenshots/login.png", "html");
});

casper.then(function () {
    casper.sendKeys('#name', config.dude_username);
});

casper.then(function () {
    casper.sendKeys('#password', config.dude_password);
});

casper.then(function () {
    casper.click('#dologin');
});

casper.wait(3000, function() {
    casper.captureSelector("screenshots/menu.png", "html");
});

var rows = content.split("\n");
for (i = startAtRow; ((i < startAtRow + batchSize) && (i < rows.length)); i++) {
    var columns = rows[i].split("\t");
    if (columns[0]) {
        addDevice(casper, config.dude_ip, columns[0], columns[1], columns[2]);
    }
}

casper.run(function () {
    casper.exit();
});
