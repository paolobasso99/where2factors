const winston = require('winston');

require('winston-daily-rotate-file');

// log path
let logPath = __dirname + '/../logs';
if (process.env.NODE_ENV == 'test') {
  logPath = __dirname + '/../logs/test';
}

const transport = new winston.transports.DailyRotateFile({
  filename: logPath + '/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '5d',
});

// timezone function winston calls to get timezone(ASIA/KOLKATA)
const timezoned = () =>
  new Date().toLocaleString('en-US', {
    timeZone: 'Europe/Rome',
  });

// options for logger object
const options = {
  file: {
    level: process.env.LOG_LEVEL,
    filename: logPath + '/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 1,
  },
  console: {
    level: process.env.LOG_LEVEL,
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

// logger object with above defined options
const transports = [new winston.transports.File(options.file), transport];

// Disable console in testing
if (process.env.NODE_ENV !== 'test') {
  transports.push(new winston.transports.Console(options.console));
}

const logger = winston.createLogger({
  transports: transports,
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp({
      format: timezoned,
    }),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
    )
  ),
  exitOnError: false,
});

// writing file
logger.stream = {
  write(message) {
    logger.info(message);
  },
};

module.exports = logger;
