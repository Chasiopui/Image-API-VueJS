import axios from 'axios'
import { storeUrl } from '../config'

function crudService (baseUrl) {
  const url = storeUrl + baseUrl

  return {
    get: async function () {
      const { data } = await axios.get(url)
      return data
    }
  }  
}

export default crudService