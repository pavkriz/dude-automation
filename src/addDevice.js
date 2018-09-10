function addDevice(casper, dudeIp, ip, username, password) {
    //casper.then(function () {
    //    casper.waitForSelector('#id_avascript:openGroup("Dude")');    // main menu with Dude item
    //});

    casper.then(function () {
    //    //casper.click('#id_avascript:openGroup("Dude")');
        casper.clickLabel('Dude');
    });

    casper.then(function () {
        //casper.click('#id_Dude:Devices');
        casper.clickLabel('Devices');
    });

    casper.wait(2000, function() {
        casper.captureSelector("screenshots/" + ip + "-devices.png", "html");
    });

    casper.then(function () {
        //casper.click('#toolbar a');
        casper.clickLabel('Add New');
    });

    // this (instead of above) does not work. why?
    //casper.thenOpen('http://' + dudeIp + '/webfig/#Dude:Devices.Device.new', function() {
    //});

    casper.wait(5000, function() {
        casper.captureSelector("screenshots/" + ip + "-add-device.png", "html");
    });

    casper.then(function () {
        casper.sendKeys('div#content > table.list > tbody:nth-child(2) > tr > td.value > input[type="text"]', 'Device ' + ip, {
            reset: true
        });
    });

    casper.wait(500, function() {
        casper.click('div#content > table.list > tbody:nth-child(3) > tr > td.value > div > div > a');
    });

    casper.wait(1000, function() {
        casper.captureSelector("screenshots/" + ip + "-address.png", "html");
    });

    casper.wait(500, function() {
        casper.sendKeys('div#content > table.list > tbody:nth-child(3) > tr > td.value > div > div > input[type="text"]', ip, {
            reset: true
        });
    });

    casper.wait(5000, function() {
        casper.sendKeys('div#content > table.list > tbody:nth-child(15) > tr > td.value > input[type="text"]', username, {
            reset: true
        });
    });

    casper.wait(5000, function() {
        casper.sendKeys('div#content > table.list > tbody:nth-child(16) > tr > td.value > input[type="password"]', password, {
            reset: true
        });
    });

    casper.wait(5000, function() {
        casper.click('div#content > table.list > tbody:nth-child(17) > tr > td.value > span > input[type="checkbox"]');    // Router OS
    });

    casper.wait(5000, function() {
        casper.click('div#content > table.list > tbody:nth-child(18) > tr > td.value > span > input[type="checkbox"]');    // Secure Mode
    });

    casper.wait(5000, function() {
        //casper.click('div#toolbar > ul > li:nth-child(1) > a');
        casper.captureSelector("screenshots/" + ip + "-before-ok.png", "html");
        casper.clickLabel('OK');
    });

    casper.wait(5000, function() {
        casper.captureSelector("screenshots/" + ip + "-after-ok.png", "html");
    });

}

module.exports = addDevice;
