import sqlite3 from 'sqlite3'

/**
 * Represents an object that can be identified.
 */
export interface Identifiable {
    id: string
}

export abstract class GenericRepository<T extends Identifiable> {
  protected db: sqlite3.Database
  protected tableName: string

  constructor (dbPath: string, tableName: string) {
    this.db = new sqlite3.Database(dbPath)
    this.tableName = tableName
  }

  abstract toRow(entity: T): any
  abstract fromRow(row: any): T

  /**
   * Create a new entity in the database.
   *
   * @param {T} entity - The entity to be created.
   * @return {Promise<T>} A promise that resolves to the created entity.
   */
  create (entity: T): Promise<T> {
    const query = `INSERT INTO ${this.tableName} SET ?`
    const row = this.toRow(entity)
    return this.runQuery(query, row).then(() => entity)
  }

  /**
   * Find a record by its ID.
   *
   * @param {string} id - The ID of the record to find.
   * @return {Promise<T>} A Promise that resolves with the record found.
   */
  findById (id: string): Promise<T> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`
    return this.getQuery(query, [id]).then(row => this.fromRow(row))
  }

  /**
   * Deletes a row from the table by its id.
   *
   * @param {string} id - The id of the row to be deleted.
   * @return {Promise<void>} A promise that resolves when the row is deleted successfully.
   */
  deleteById (id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`
    return this.runQuery(query, [id])
  }

  /**
   * Finds all records in the table.
   *
   * @return {Promise<T[]>} A promise that resolves to an array of records.
   */
  findAll (): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`
    return this.getQuery(query, []).then(rows => rows.map(row => this.fromRow(row)))
  }

  /**
 * Runs a query on the database with the provided parameters.
 *
 * @param query - The SQL query to execute.
 * @param params - The parameters to bind to the query.
 * @returns A Promise that resolves when the query is successfully executed.
 */
  private runQuery (query: string, params: any[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.db.run(query, params, (err: Error | null) => {
        if (err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }

  /**
 * Executes the given query with the provided parameters and returns a promise that resolves to an array of results.
 *
 * @param query - The SQL query to execute.
 * @param params - The parameters to pass to the query.
 * @returns A promise that resolves to an array of results.
 */
  private getQuery (query: string, params: any[]): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      this.db.all(query, params, (err, rows) => {
        if (err) {
          reject(err)
          return
        }
        resolve(rows)
      })
    })
  }
}
