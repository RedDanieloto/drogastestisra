import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Droga from 'App/Models/Droga'

export default class DrogaSeeder extends BaseSeeder {
  public async run () {
    await Droga.createMany([
      { nombre: 'Cocaína', tipo: 'Estimulante', categoriasId: 1 },
      { nombre: 'Alcohol', tipo: 'Depresor', categoriasId: 2 },
      { nombre: 'LSD', tipo: 'Alucinógeno', categoriasId: 3 },
      { nombre: 'Morfina', tipo: 'Opiáceo', categoriasId: 4 }
    ])
  }
}
