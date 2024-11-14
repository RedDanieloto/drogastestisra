import { assert } from '@japa/assert'
import { apiClient } from '@japa/api-client'
import app from '@adonisjs/core/services/app'
import type { Config } from '@japa/runner/types'
import { pluginAdonisJS } from '@japa/plugin-adonisjs'
import testUtils from '@adonisjs/core/services/test_utils'
import { exec } from 'node:child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)
export const plugins: Config['plugins'] = [assert(), apiClient(), pluginAdonisJS(app)]
export const runnerHooks: Required<Pick<Config, 'setup' | 'teardown'>> = {
  setup: [
    async () => {
      await execAsync('node ace migration:rollback')
      await execAsync('node ace migration:run')
      await execAsync('node ace db:seed')
    },
  ],
  teardown: [
    async () => {
      await execAsync('node ace migration:rollback --force')
    },
  ],
}
export const configureSuite: Config['configureSuite'] = (suite) => {
  if (['browser', 'functional', 'e2e'].includes(suite.name)) {
    return suite.setup(() => testUtils.httpServer().start())
  }
}
