const electron = require('electron');
const path = require('path');
const fs = require('fs');
// https://medium.com/cameron-nokes/how-to-store-user-data-in-electron-3ba6bf66bc1e
class Store {
  constructor(options) {
    // Renderer process has to get `app` module via `remote`, whereas the main process can get it directly
    // app.getPath('userData') will return a string of the user's app data directory path.
    const userDataPath = (electron.app || electron.remote.app).getPath(
      'userData'
    );
    // We'll use the `configName` property to set the file name and path.join to bring it all together as a strin
    this.path = path.join(userDataPath, options.configName + '.json'); // path to the json file
    this.data = parseDataFile(this.path, options.defaults); // default settings
  }
  // This will just return the property on the `data` object

  get(key) {
    return this.data[key];
  }
  // ...and this will set it
  set(key, val) {
    this.data[key] = val;
    // With the JSON.stringify() method, you can convert a JavaScript object into a string with JSON syntax.
    fs.writeFileSync(this.path, JSON.stringify(this.data)); // write to the json file
  }
}

function parseDataFile(filePath, defaults) {
  try {
    // With the JSON.parse() method, you can convert text into a JavaScript object.
    console.log('read file');
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    console.log('no file');
    return defaults;
  }
}

module.exports = Store;
