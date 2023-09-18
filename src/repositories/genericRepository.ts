import { sqlite3 } from 'sqlite3'

export interface Identifiable {
    id: string
}

export class GenericRepository<T extends Identifiable> {
  protected db: sqlite3.Database
  protected tableName: string

  constructor (db: sqlite3.Database, tableName: string) {
    this.db = db
    this.tableName = tableName
  }

  abstract toRow(entity: T): any
  abstract fromRow(row: any): T

  create (entity: T): Promise<T> {
    const query = `INSERT INTO ${this.tableName} SET ?`
    const row = this.toRow(entity)
    return this.runQuery(query, row).then(() => entity)
  }

  findById (id: string): Promise<T> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = ?`
    return this.getQuery(query, [id]).then(row => this.fromRow(row))
  }

  deleteById (id: string): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = ?`
    return this.runQuery(query, [id])
  }

  findAll (): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`
    return this.getQuery(query, []).then(rows => rows.map(row => this.fromRow(row)))
  }

  private runQuery (query: string, params: any[]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.run(query, params, (err) => {
        if (err) {
          reject(err)
        }
        resolve()
      })
    })
  }

  private getQuery (query: string, params: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.db.get(query, params, (err, rows) => {
        if (err) {
          reject(err)
        }
        resolve(rows)
      })
    })
  }
}
