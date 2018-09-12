# The Dude Automation

Automation scripts for MikroTik's The Dude.

## How to use

Prepare `config.json` and `devices.tsv`. 

```
npm install
# run in multi-batch mode:
npm start
# or run a single-batch:
./node_modules/.bin/casperjs casper-script.js
# or use slimer engine (gecko with UI) and run single-batch:
./node_modules/.bin/casperjs --engine=slimerjs casper-script.js
```