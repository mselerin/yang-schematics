export enum LogLevelEnum {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 9
}


class LoggerService {
  public loggingServiceUrl: string;
  public clientLogLevel: LogLevelEnum;
  public serverLogLevel: LogLevelEnum;


  constructor() {
    this.loggingServiceUrl = null;
    this.clientLogLevel = LogLevelEnum.INFO;
    this.serverLogLevel = LogLevelEnum.ERROR;
  }


  public debug(...msg: any[]): void {
    this.log(LogLevelEnum.DEBUG, ...msg);
  }

  public info(...msg: any[]): void {
    this.log(LogLevelEnum.INFO, ...msg);
  }

  public warn(...msg: any[]): void {
    this.log(LogLevelEnum.WARN, ...msg);
  }

  public error(...msg: any[]): void {
    this.log(LogLevelEnum.ERROR, ...msg);
  }



  protected log(level: LogLevelEnum, ...msg: any[]): void {
    const logLevelStr: string = LogLevelEnum[level].toUpperCase();
    const logFunction: string = logLevelStr.toLowerCase();


    // Log dans la console
    if (level >= this.clientLogLevel) {
      console[logFunction](logLevelStr, ...msg);
    }


    // Log vers le serveur
    if (level >= this.serverLogLevel && this.loggingServiceUrl) {
      try {
        fetch(`${this.loggingServiceUrl}/${logLevelStr}`, {
          method: 'POST',
          body: this.toJSON(msg)
        });
      } catch (err) {
        console.error('Cannot send error to server', err);
      }
    }
  }


  protected toJSON(...msg: any[]): string {
    return JSON.stringify(msg.map(m => m.toString()));
  }
}

export function createLogger() {
  return new LoggerService();
}

export const LOGGER = createLogger();
