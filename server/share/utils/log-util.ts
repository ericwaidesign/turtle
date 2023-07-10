import chalk from 'chalk';
import { COMMON } from '../constants/common';

export default class LogUtil {

  static createGeneralMsg = (msg: string) => {
    console.log(
      chalk.green(`[${COMMON.APP_NAME}]: ${msg}`)
    )
  }

  static createMongooseMsg = (dbName: string, msg: string) => {
    console.log(
      chalk.green(`[${COMMON.APP_NAME}]: [${COMMON.MONGOOSE}]: [DB ${chalk.yellow.bold(dbName)}]: ${msg}`)
    )
  }
 
  static createMongooseErrMsg = (dbName: string, errMsg: string) => {
    console.log(
      chalk.red(`[${COMMON.APP_NAME}]: [${COMMON.MONGOOSE}]: [DB ${chalk.yellow.bold(dbName)}]: ${errMsg}`)
    )
  }
}