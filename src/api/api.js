import Vue from 'vue'
const config = require('../config.json')
let path = 'posts'

export default class Api {
  getPosts () {
    Vue.http.get(config.api + path).then(
      function (data) {
        return data
      }, function () {
        return 'error'
      })
  }
}
