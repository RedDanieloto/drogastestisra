import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id') // Clave primaria
      table.string('full_name').nullable() // Nombre completo, opcional
      table.string('email', 254).notNullable().unique() // Email único y requerido
      table.string('password').notNullable() // Contraseña requerida
      table.timestamp('created_at', { useTz: true }).notNullable() // Fecha de creación con zona horaria
      table.timestamp('updated_at', { useTz: true }).nullable() // Fecha de actualización con zona horaria
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName) // Elimina la tabla en rollback
  }
}
