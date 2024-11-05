import { test } from '@japa/runner'
import Database from '@ioc:Adonis/Lucid/Database'
import Categoria from 'App/Models/Categoria'
import Droga from 'App/Models/Droga'

test.group('Pruebas chidas de BD - Drogas y Categorias', (group) => {
  group.setup(async () => {
    await Database.beginGlobalTransaction()
  })

  group.teardown(async () => {
    await Database.rollbackGlobalTransaction()
  })

  test('Test 1 - A ver si jala el SELECT * de categorias', async ({ assert }) => {
    await Categoria.create({ categoria: 'Estimulantes', descripcion: 'Drogas que te ponen pilas' })
    const categorias = await Database.from('categorias').select('*')
    assert.isArray(categorias)
    assert.isNotEmpty(categorias)
  })

  test('Test 2 - A ver si jala el SELECT * de drogas', async ({ assert }) => {
    await Droga.create({ nombre: 'Cocaína', tipo: 'Estimulante', categoriasId: 1 })
    const drogas = await Database.from('drogas').select('*')
    assert.isArray(drogas)
    assert.isNotEmpty(drogas)
  })

  test('Test 3 - INNER JOIN pa checar la relación entre Drogas y Categorias', async ({ assert }) => {
    const categoria = await Categoria.create({ categoria: 'Depresores', descripcion: 'Drogas que te apagan' })
    await Droga.create({ nombre: 'Alcohol', tipo: 'Depresor', categoriasId: categoria.id })

    const resultado = await Database
      .from('drogas')
      .innerJoin('categorias', 'drogas.categorias_id', 'categorias.id')
      .select('drogas.nombre', 'categorias.categoria')
      .where('drogas.nombre', 'Alcohol')
      .first()

    assert.isNotNull(resultado)
    assert.equal(resultado.categoria, 'Depresores')
  })

  test('Test 4 - INNER JOIN pa checar si la droga está en la categoría que toca', async ({ assert }) => {
    const categoria = await Categoria.create({ categoria: 'Alucinógenos', descripcion: 'Drogas que te hacen ver colores' })
    await Droga.create({ nombre: 'LSD', tipo: 'Alucinógeno', categoriasId: categoria.id })

    const resultado = await Database
      .from('drogas')
      .innerJoin('categorias', 'drogas.categorias_id', 'categorias.id')
      .select('drogas.nombre', 'categorias.categoria')
      .where('categorias.categoria', 'Alucinógenos')
      .first()

    assert.isNotNull(resultado)
    assert.equal(resultado.nombre, 'LSD')
  })


  test('Test 5 - WHERE pa buscar una droga por nombre y tipo', async ({ assert }) => {
    await Droga.create({ nombre: 'Éxtasis', tipo: 'Estimulante', categoriasId: 1 })

    const droga = await Database.from('drogas').select('*').where({
      nombre: 'Éxtasis',
      tipo: 'Estimulante'
    }).first()

    assert.isNotNull(droga)
    assert.equal(droga.nombre, 'Éxtasis')
    assert.equal(droga.tipo, 'Estimulante')
  })


  test('Test 6 - WHERE pa buscar una categoría específica', async ({ assert }) => {
    await Categoria.create({ categoria: 'Opiáceos', descripcion: 'Drogas derivadas del opio, bien heavy' })
    const categoria = await Database.from('categorias').select('*').where({
      categoria: 'Opiáceos'
    }).first()

    assert.isNotNull(categoria)
    assert.equal(categoria.categoria, 'Opiáceos')
  })
})
