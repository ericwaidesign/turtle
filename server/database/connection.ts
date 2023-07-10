import mongoose from "mongoose";
import { IConnectionConfig } from "./connection-config";
import error from "../share/utils/error-util";
import log from "../share/utils/log-util";

export default class MongooseConnection {
  private config: IConnectionConfig;

  constructor(config: IConnectionConfig) {
    this.config = config;
    mongoose.connection.on('connected', this.onConnected);
    mongoose.connection.on('disconnected', this.onDisconnected);
    mongoose.connection.on('reconnected', this.onReconnected);
    mongoose.connection.on('error', this.onError);
    mongoose.connection.on('SIGINT', this.onSigInt);
  }

  /**
   * start mongo connection
   */
  public connect() {
    log.createMongooseMsg(this.config.dbName, 'create connection...');  
    this.initConnection();
  }

  /**
   * @description close MongoDB connection
   * @param {boolean} force 
   */
  public async close(force: boolean) {
    await mongoose.connection.close(force);
    log.createMongooseErrMsg(this.config.dbName, 'connection closed');
  }

  /**
   * @description 
   */
  private initConnection = () => {
    mongoose.connect(this.config.dbConnectionString)
      .then(() => {
        log.createMongooseMsg(this.config.dbName, 'opening connection...');
      })
      .catch(error.mongooseErrHandler);
  }

  /**
   * @description event is fired when connection is successfully connected
   */
  private onConnected = () => {
    log.createMongooseMsg(this.config.dbName, 'connection opens');
  }

  /**
   * @description event is fired when disconnected
   * @param {Error} err 
   */
  private onDisconnected = (err: Error) => {
    log.createMongooseErrMsg(this.config.dbName, 'connection disconnected');
  }

  /**
   * @description event is fired when reconnected
   * @param {Error} err 
   */
  private onReconnected = (err: Error) => {
    log.createMongooseMsg(this.config.dbName, 'connection reconnected');
  }

  /**
   * @description event is fired when connection failed to connect
   * @param {Error} err 
   */
  private onError = error.mongooseErrHandler;

  /**
   * @description close Mongoose connection if Node proccess ends
   *  SIGINT process is triggered when Ctrl-C has been pressed on terminal
   *  or on a server shutdown.
   */
  private onSigInt = () => {
    log.createMongooseErrMsg(this.config.dbName, 'connection disconnected through app termination');
    this.close(true);
    process.exit(0);
  }
}