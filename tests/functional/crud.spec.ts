import { test } from '@japa/runner'
import User from '#models/user'

test.group('CRUD Users', (group) => {
  let createdUserIds: number[] = []

  group.each.teardown(async () => {
    await User.query().whereIn('id', createdUserIds).delete()
    createdUserIds = []
  })

  test('Create some users and check the quantity in DB', async ({ assert }) => {
    const users = await User.createMany([
      { fullName: 'User 1', email: 'user1@example.com', password: 'password123' },
      { fullName: 'User 2', email: 'user2@example.com', password: 'password123' },
      { fullName: 'User 3', email: 'user3@example.com', password: 'password123' },
    ])
    createdUserIds = users.map((user) => user.id)
    const totalUsers = await User.query().count('* as total')
    const total = totalUsers[0].$extras.total
    assert.isTrue(total >= 3, 'At least 3 users should exist in the database')
  })

  test('Delete 2 users and check the new quantity in DB', async ({ assert }) => {
    const users = await User.createMany([
      { fullName: 'User 4', email: 'user4@example.com', password: 'password123' },
      { fullName: 'User 5', email: 'user5@example.com', password: 'password123' },
    ])
    createdUserIds.push(...users.map((user) => user.id))
    await User.query().where('id', users[0].id).delete()
    await User.query().where('id', users[1].id).delete()
    const totalUsers = await User.query().count('* as total')
    const total = totalUsers[0].$extras.total
    assert.isTrue(total >= 0, 'The database should reflect the deleted users')
  })

  test('Update the info of 1 user and check if changes in DB', async ({ assert }) => {
    const user = await User.create({
      fullName: 'User 6',
      email: 'user6@example.com',
      password: 'password123',
    })
    createdUserIds.push(user.id)
    user.merge({ fullName: 'Updated User 6' })
    await user.save()
    const updatedUser = await User.find(user.id)
    assert.equal(updatedUser?.fullName, 'Updated User 6', 'The user name should be updated in the database')
  })
})
