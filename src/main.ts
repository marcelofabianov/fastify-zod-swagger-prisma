import { serverStart } from './http/server.js'

const appPromise = serverStart()

appPromise.catch((error) => {
  console.error(error)
  process.exit(1)
})
