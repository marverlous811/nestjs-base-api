interface IDataStore {
  connect(): Promise<boolean>
  shutdown(): Promise<boolean>
}
