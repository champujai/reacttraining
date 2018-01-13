import 'isomorphic-fetch'

const api = 'http://localhost:4000'

export default function fetchAPI(url, name = 'data') {
  return fetch(`${api}${url}`)
    .then(function (res) {
      // console.log(res)
      return res.json()
    })
    .then(function (json) {
      //  console.log(json)
      return {
        [name]: json
      }
    })
}
