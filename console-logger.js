const logger = require('./logger');
const moment = require('moment');

class ConsoleLogger extends logger.Logger{
  constructor(prefix, defaultLevel, dateFormat){
    super(prefix, defaultLevel, dateFormat);
    this.prefix = prefix;
    this.defaultLevel = defaultLevel;
    this.dateFormat = dateFormat;
  }

  format(message, level){
    const date = moment().format(this.dateFormat);
    return `${date} | ${this.prefix} | ${message}`;
  }

  log(message, level){
    switch (level) {
      case 'LOG':
        console.log(this.format(message, level));
        break;
      case 'INFO':
        console.info(this.format(message, level));
        break;
      case 'WARN':
        console.warn(this.format(message, level));
        break;
      case 'ERROR':
        console.error(this.format(message, level));
        break;
      default:
        console.log(this.format(message, this.defaultLevel));
        break;
    }
  }
}
