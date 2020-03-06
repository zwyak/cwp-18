const logger = require('./logger');
const moment = require('moment');
const fs = require('fs');
const path = require('path');

class FileLogger extends logger.Logger{
  constructor(file, prefix, defaultLevel, dateFormat){
    super(prefix, defaultLevel, dateFormat);
    this.file = file;
    this.prefix = prefix;
    this.defaultLevel = defaultLevel;
    this.dateFormat = dateFormat;

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
        this.file.write(super.format(message, level)+'\r\n');
        break;
      case 'INFO':
        this.file.write(super.format(message, level)+'\r\n');
        break;
      case 'WARN':
        this.file.write(super.format(message, level)+'\r\n');
        break;
      case 'ERROR':
        this.file.write(super.format(message, level)+'\r\n');
        break;
      default:
        this.file.write(super.format(message, this.defaultLevel)+'\r\n');
        break;
    }

    return new Promise((resolve, reject) => {
      resolve(this.close());
    });
  }
}

module.exports.FileLogger = FileLogger;
