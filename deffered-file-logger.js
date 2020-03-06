const logger = require('./logger');
const flogger = require('./file-logger');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

class DefferedFileLogger extends flogger.FileLogger{
  constructor(file, queueLength, prefix, defaultLevel, dateFormat){
    super(file, prefix, defaultLevel, dateFormat);
    this.file = file;
    this.queueLength = queueLength;
    this.prefix = prefix;
    this.defaultLevel = defaultLevel;
    this.dateFormat = dateFormat;
    this.queue = [];

    if (typeof file == 'string')
      this.file = fs.createWriteStream(file, { 'flags': 'a'});
  }

  close(){
    this.file.end();
    return 'Stream was closed';
  }

  log(message, level){
    switch (level) {
      case 'LOG':
        this.queue.push(super.format(message, level)+'\r\n');
        break;
      case 'INFO':
        this.queue.push(super.format(message, level)+'\r\n');
        break;
      case 'WARN':
        this.queue.push(super.format(message, level)+'\r\n');
        break;
      case 'ERROR':
        this.queue.push(super.format(message, level)+'\r\n');
        break;
      default:
        this.queue.push(super.format(message, this.defaultLevel)+'\r\n');
        break;
    }

    if (this.queue.length == this.queueLength){
      this.queue.forEach((item, i) => {
        this.file.write(item);
      });
      this.queue = [];
    }

    return new Promise((resolve, reject) => {
      resolve(this.close());
    });
  }
}

module.exports.DefferedFileLogger = DefferedFileLogger;
