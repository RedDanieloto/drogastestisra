import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Drogas extends BaseSchema {
  protected tableName = 'drogas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 255).notNullable()
      table.string('tipo', 255).notNullable()
      table.integer('categorias_id').unsigned().references('id').inTable('categorias').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
