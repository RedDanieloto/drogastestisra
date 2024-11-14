import { test } from '@japa/runner'
import User from '#models/user'

test.group('Check users data in DB', () => {
  test('Test some data of user with ID 7', async ({ assert }) => {
    const user = await User.find(7)

    assert.exists(user, 'User with ID 7 should exist')
    assert.equal(user?.id, 7) // Verifica que el ID sea 7
  })

  test('Test if non-existent user returns null or empty', async ({ assert }) => {
    const user = await User.find(99999)

    assert.isNull(user, 'Non-existent user should return null')
  })

  test('Test quantity of users in DB is correct (e.g., 11)', async ({ assert }) => {
    const totalUsers = await User.query().count('* as total')
    const total = totalUsers[0].$extras.total

    assert.equal(total, 11, 'Total users in DB should be 11')
  })
})
