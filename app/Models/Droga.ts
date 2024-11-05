import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Categoria from './Categoria'

export default class Droga extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public nombre: string

  @column()
  public tipo: string

  @column()
  public categoriasId: number

  @belongsTo(() => Categoria)
  public categoria: BelongsTo<typeof Categoria>
}
