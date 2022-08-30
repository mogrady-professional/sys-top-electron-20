const path = require('path');
const osu = require('node-os-utils'); //
const cpu = osu.cpu; // CPU
const mem = osu.mem; // memory
const os = osu.os; // OS info

let cpuOverload = 80;

// Run every 2 seconds
setInterval(() => {
  // CPU Usage
  cpu.usage().then((info) => {
    document.getElementById('cpu-usage').innerText = info + '%';

    document.getElementById('cpu-progress').style.width = info + '%';

    // Make progress bar red if overload
    if (info >= cpuOverload) {
      document.getElementById('cpu-progress').style.background = 'red';
    } else {
      document.getElementById('cpu-progress').style.background = '#30c88b';
    }
  });
  // CPU Free
  cpu.free().then((info) => {
    document.getElementById('cpu-free').innerText = info + '%';
  });
  // Uptime
  document.getElementById('sys-uptime').innerText = secondsToDhms(os.uptime());
}, 1500);

// Set model
document.getElementById('cpu-model').innerText = cpu.model();

// Computer Name
document.getElementById('comp-name').innerText = os.hostname();

// OS
document.getElementById('os').innerText = `${os.type()} ${os.arch()}`;

// Total Memory
mem.info().then((info) => {
  //   console.log(info);
  document.getElementById('mem-total').innerText = info.totalMemMb;
  document.getElementById('mem-used').innerText = info.usedMemMb;
  document.getElementById('mem-free').innerText = info.freeMemMb;
});

// Show days, hours, mins, secs
function secondsToDhms(seconds) {
  seconds = +seconds; // make sure it's a number
  var d = Math.floor(seconds / (3600 * 24)); // get days (seconds in a hr x 24hrs)
  var h = Math.floor((seconds % (3600 * 24)) / 3600); // get hours (seconds in hr x 24hrs)
  var m = Math.floor((seconds % 3600) / 60); // minutes (get minutes (seconds in a minute)
  var s = Math.floor(seconds % 60); // seconds (get seconds)
  return `${d}d, ${h}h, ${m}m, ${s}s`;
}
