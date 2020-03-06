const moment = require('moment');

class Logger {
  constructor(prefix, defaultLevel, dateFormat) {
    if (!prefix || !defaultLevel || !dateFormat) throw new Error();
    this.prefix = prefix;
    this.defaultLevel = defaultLevel;
    this.dateFormat = dateFormat;
  }

  format(message, level){
    const date = moment().format(this.dateFormat);
    return `${date} | ${this.prefix} | ${!level ? this.defaultLevel : level} | ${message}`;
  }
}

module.exports.Logger = Logger;
