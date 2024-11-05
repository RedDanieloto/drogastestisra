// Cargar los modelos
const Categoria = use('App/Models/Categoria')
const Personaje = use('App/Models/Personaje')

async function testRelationships() {
  // Obtener todos los personajes de una categoría específica
  const categoria = await Categoria.find(2) // Cambia el ID según tus datos
  const personajes = await categoria?.related('personajes').query()
  console.log('Personajes relacionados con la categoría:', personajes)

  // Obtener la categoría de un personaje específico
  const personaje = await Personaje.find(5) // Cambia el ID según tus datos
  const categoriaRelacionada = await personaje?.related('categoria').query().first()
  console.log('Categoría relacionada con el personaje:', categoriaRelacionada)
}

// Ejecutar la función y cerrar el proceso
testRelationships().then(() => {
  process.exit(0)
})
