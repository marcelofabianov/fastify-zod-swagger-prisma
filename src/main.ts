import { serverStart } from './server.js'

const appPromise = serverStart()

appPromise.catch((error) => {
  console.error(error)
  process.exit(1)
})
