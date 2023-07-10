import chalk from 'chalk';
import { COMMON } from '../constants/common';

export default class ErrorUtil {

  /**
   * @param {Error} err 
   */
  static mongooseErrHandler = (err: Error) => {
    console.log(
      chalk.red(`[${COMMON.APP_NAME}]: [${COMMON.MONGOOSE}]: ${err}`)
    )
  }
}