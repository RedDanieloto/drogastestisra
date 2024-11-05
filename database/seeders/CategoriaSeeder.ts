import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Categoria from 'App/Models/Categoria'

export default class CategoriaSeeder extends BaseSeeder {
  public async run () {
    await Categoria.createMany([
      { categoria: 'Estimulantes', descripcion: 'Para andar bien pilas y a tope' },
      { categoria: 'Depresores', descripcion: 'Pa’ bajarle dos rayitas y relajarte' },
      { categoria: 'Alucinógenos', descripcion: 'Para ver colores y flipar' },
      { categoria: 'Opiáceos', descripcion: 'Directo del opio, te pone bien chill' }
    ])
  }
}
