import { test } from '@japa/runner'

test('Crear un nuevo usuario', async ({ client }) => {
  const response = await client.post('/api/v1/users').json({
    fullName: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
  })

  response.assertStatus(201)
  response.assertBodyContains({
    message: 'Usuario creado exitosamente',
    user: {
      fullName: 'Test User',
      email: 'testuser@example.com',
    },
  })
})

test('Iniciar sesión con credenciales válidas', async ({ client, assert }) => {
  const response = await client.post('/api/v1/login').json({
    email: 'richito@example.com',
    password: 'richito123',
  })

  response.assertStatus(200)
  response.assertBodyContains({ message: 'Login successful' })
  assert.exists(response.body().token, 'El token no fue generado correctamente')
})

test('Iniciar sesión con credenciales inválidas', async ({ client }) => {
  const response = await client.post('/api/v1/login').json({
    email: 'invalid@example.com',
    password: 'wrongpassword',
  })

  response.assertStatus(401)
  response.assertBodyContains({ error: 'Invalid credentials' })
})

test('Obtener información del usuario autenticado', async ({ client }) => {
  const loginResponse = await client.post('/api/v1/login').json({
    email: 'richito@example.com',
    password: 'richito123',
  })
  const token = loginResponse.body().token

  const response = await client.get('/api/v1/me').header('Authorization', `Bearer ${token}`)

  response.assertStatus(200)
  response.assertBodyContains({
    fullName: 'Richito',
    email: 'richito@example.com',
  })
})
