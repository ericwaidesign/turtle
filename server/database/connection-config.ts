export interface IConnectionConfig {
  dbConnectionString: string,
  dbName: string,
  debug?: boolean,
  onConnected?: () => void;
  onDisconnected?: () => void;
  onReconnected?: () => void;
  onError?: () => void;
}