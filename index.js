var casper = require('casper').create();
casper.on('step.error', function(err) {
    casper.page.evaluate(function() {
        document.body.bgColor = 'white';
    });
    casper.captureSelector("screenshots/error.png", "html");
    this.die("Step failed: " + err + " See error.png for more info");
});
casper.options.waitTimeout = 20000;
casper.options.verbose = true;
casper.options.logLevel ="debug";
casper.options.viewportSize = {width: 1280, height: 1280};

casper.start('http://10.107.1.1/webfig/', function () {
    // Wait for the page to be loaded (login button)
    casper.waitForSelector('a#dologin');
});

casper.wait(2000, function() {
    casper.captureSelector("screenshots/login.png", "html");
});

casper.then(function () {
    casper.sendKeys('#name', 'pavkriz');
});

casper.then(function () {
    casper.sendKeys('#password', 'xxx');
});

casper.then(function () {
    console.log("Logging in...");
    casper.click('#dologin');
});

casper.wait(3000, function() {
    casper.captureSelector("screenshots/menu.png", "html");
});


//casper.then(function () {
//    casper.waitForSelector('#id_avascript:openGroup("Dude")');    // main menu with Dude item
//});

casper.then(function () {
    //casper.click('#id_avascript:openGroup("Dude")');
    casper.clickLabel('Dude');
});

casper.then(function () {
    //casper.click('#id_Dude:Devices');
    casper.clickLabel('Devices');
});

casper.wait(2000, function() {
    casper.captureSelector("screenshots/devices.png", "html");
});

casper.then(function () {
    //casper.click('#toolbar a');
    casper.clickLabel('Add New');
});

casper.then(function () {
    casper.sendKeys('div#content > table.list > tbody:nth-child(2) > tr > td.value > input[type="text"]', 'Deviceabc');
});

casper.then(function () {
    casper.click('div#content > table.list > tbody:nth-child(3) > tr > td.value > div > div > a');
});

casper.wait(1000, function() {
    casper.captureSelector("screenshots/address.png", "html");
});

casper.then(function () {
    // delete 0.0.0.0
    for (i = 0; i < 7; i++) {
        casper.sendKeys('div#content > table.list > tbody:nth-child(3) > tr > td.value > div > div > input[type="text"]', casper.page.event.key.Backspace);
    }
    casper.sendKeys('div#content > table.list > tbody:nth-child(3) > tr > td.value > div > div > input[type="text"]', '10.107.112.7');
});

casper.then(function () {
    casper.sendKeys('div#content > table.list > tbody:nth-child(15) > tr > td.value > input[type="text"]', 'admin');
});

casper.then(function () {
    casper.sendKeys('div#content > table.list > tbody:nth-child(16) > tr > td.value > input[type="password"]', 'test');
});

casper.then(function () {
    //casper.click('div#toolbar > ul > li:nth-child(1) > a');
    casper.captureSelector("screenshots/beforeok.png", "html");
    casper.clickLabel('OK');
});

casper.wait(1000, function() {
    casper.captureSelector("screenshots/afterok.png", "html");
});

casper.run(function () {
    casper.exit();
});
