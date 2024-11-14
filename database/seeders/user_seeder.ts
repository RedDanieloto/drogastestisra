import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class extends BaseSeeder {
  public async run() {
    const users = [
      {
        fullName: 'Richito',
        email: 'richito@example.com',
        password: await Hash.make('richito123'),
      },
      {
        fullName: 'Gerita Alcantar',
        email: 'geraatj@example.com',
        password: await Hash.make('Gerita123'),
      },
      {
        fullName: 'Kevincito TodoLeFalla',
        email: 'KevinGlezAnc@example.com',
        password: await Hash.make('Kevin123'),
      },
      {
        fullName: 'Pancho Villa',
        email: 'panchovilla@example.com',
        password: await Hash.make('password123'),
      },
      {
        fullName: 'Danito Cabrera',
        email: 'danic3715@example.com',
        password: await Hash.make('Danielito336'),
      },
      {
        fullName: 'Chucho Hernández',
        email: 'chucho@example.com',
        password: await Hash.make('password123'),
      },
      {
        fullName: 'Doña Cuca',
        email: 'donacuca@example.com',
        password: await Hash.make('password123'),
      },
      {
        fullName: 'Pepe Aguilar',
        email: 'pepeaguilar@example.com',
        password: await Hash.make('password123'),
      },
      {
        fullName: 'Rosita Alvarado',
        email: 'rosita@example.com',
        password: await Hash.make('password123'),
      },
      {
        fullName: 'Nacho Libre',
        email: 'nacholibre@example.com',
        password: await Hash.make('password123'),
      },
    ]

    await User.createMany(users)
  }
}
