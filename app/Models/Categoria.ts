import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Droga from './Droga'

export default class Categoria extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public categoria: string

  @column()
  public descripcion: string

  @hasMany(() => Droga)
  public drogas: HasMany<typeof Droga>
}
