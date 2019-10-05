import axios from 'axios'
import serverConfig from '../config/server-config'

export default axios.create({
  baseURL: serverConfig.URL
})
