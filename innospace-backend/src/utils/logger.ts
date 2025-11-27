export const logger = {
  info: (message: unknown) => console.info(`[INFO] ${new Date().toISOString()} -`, message),
  warn: (message: unknown) => console.warn(`[WARN] ${new Date().toISOString()} -`, message),
  error: (message: unknown) => console.error(`[ERROR] ${new Date().toISOString()} -`, message),
  debug: (message: unknown) => console.debug(`[DEBUG] ${new Date().toISOString()} -`, message),
};
