import { serverStart } from './server.js'
import { containerWrapper } from './container.js'

const appPromise = serverStart(containerWrapper)

appPromise.catch((error) => {
  console.error(error)
  process.exit(1)
})
