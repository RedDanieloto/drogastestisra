import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import Hash from '@adonisjs/core/services/hash'

export default class UsersController {
  public async create({ request, response }: HttpContext) {
    const { fullName, email, password } = request.only(['fullName', 'email', 'password'])

    const existingUser = await User.findBy('email', email)
    if (existingUser) {
      return response.conflict({ message: 'El correo electrónico ya está en uso' })
    }

    const hashedPassword = await Hash.make(password)
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
    })

    return response.created({ message: 'Usuario creado exitosamente', user })
  }


  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.findByOrFail('email', email)
      const passwordMatches = await Hash.verify(user.password, password)

      if (!passwordMatches) {
        return response.unauthorized({ error: 'Invalid credentials' })
      }

      const token = await User.accessTokens.create(user, ['*'], { expiresIn: '30 days' })

      return response.ok({
        message: 'Login successful',
        token: token.value!.release(),
      })
    } catch (error) {
      return response.unauthorized({ error: 'Invalid credentials' })
    }
  }


  public async me({ auth, response }: HttpContext) {
    try {
      const user = await auth.use('api').authenticate()
      return response.ok(user)
    } catch {
      return response.unauthorized({ error: 'Not authenticated' })
    }
  }


  public async index({ response }: HttpContext) {
    console.log('[UsersController]: Listando todos los usuarios...');
    const users = await User.all()
    return response.ok(users)
  }


  public async show({ params, response }: HttpContext) {
    console.log(`[UsersController]: Mostrando usuario con ID ${params.id}`);
    try {
      const user = await User.findOrFail(params.id)
      return response.ok(user)
    } catch {
      return response.notFound({ error: 'Usuario no encontrado' })
    }
  }


  public async update({ params, request, response }: HttpContext) {
    console.log(`[UsersController]: Actualizando usuario con ID ${params.id}`);
    try {
      const user = await User.findOrFail(params.id)
      const updates = request.only(['fullName', 'email', 'password'])

      if (updates.password) {
        updates.password = await Hash.make(updates.password)
      }

      user.merge(updates)
      await user.save()

      return response.ok({ message: 'Usuario actualizado exitosamente', user })
    } catch {
      return response.notFound({ error: 'Usuario no encontrado' })
    }
  }


  public async destroy({ params, response }: HttpContext) {
    console.log(`[UsersController]: Eliminando usuario con ID ${params.id}`);
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()
      return response.ok({ message: 'Usuario eliminado exitosamente' })
    } catch {
      return response.notFound({ error: 'Usuario no encontrado' })
    }
  }
}
