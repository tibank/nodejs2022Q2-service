import { LogLevel } from './loglevels.type';

const LOG_LEVEL_VALUES: Record<LogLevel, number> = {
  debug: 0,
  verbose: 1,
  log: 2,
  warn: 3,
  error: 4,
};

export function isLogLevelEnabled(level: LogLevel): boolean {
  const checkLevel = LOG_LEVEL_VALUES[level];

  return checkLevel <= parseInt(process.env.LOG_LEVEL);
}
