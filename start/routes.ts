import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Importa el controlador
import UsersController from '#controllers/users_controller'

// Crea una instancia del controlador
const usersController = new UsersController()

// Rutas públicas
router.group(() => {
  // Ruta para crear un nuevo usuario
  router.post('users', async (ctx) => {

    return usersController.create(ctx)
  })

  // Ruta para iniciar sesión
  router.post('login', async (ctx) => {

    return usersController.login(ctx)
  })
}).prefix('api/v1')

// Rutas protegidas
router.group(() => {
  // Ruta para obtener información del usuario autenticado
  router.get('me', async (ctx) => {

    return usersController.me(ctx)
  })

  // Ruta para listar todos los usuarios
  router.get('users', async (ctx) => {

    return usersController.index(ctx)
  })

  // Ruta para mostrar un usuario por ID
  router.get('users/:id', async (ctx) => {

    return usersController.show(ctx)
  })

  // Ruta para actualizar un usuario
  router.put('users/:id', async (ctx) => {

    return usersController.update(ctx)
  })

  // Ruta para eliminar un usuario
  router.delete('users/:id', async (ctx) => {

    return usersController.destroy(ctx)
  })
})
  .prefix('api/v1')
  .use(middleware.auth({ guards: ['api'] }))
