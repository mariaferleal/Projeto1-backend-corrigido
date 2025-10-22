export class Logger {
  static info(msg, obj) {
    console.log(`[INFO] ${new Date().toISOString()} - ${msg}`, obj ?? '');
  }
  static error(msg, obj) {
    console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`, obj ?? '');
  }
}
