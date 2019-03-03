import Listeners from './Listeners'


// const config = {
//   type: String,
//   value: 'haha',
//   provider: function (insert) {
//     insert(value)
//   }
// }

import Manager from './Manager'

let Bucket = function() {
  this.$keys = []
  this.$values = {}
  this.$listenersMap = {}
}

const getInserter = function (instance, key) {
  return function (value) {
    const commiter = BucketExtends.commit.bind(instance)
    commiter(key, value)
  }
}


let BucketExtends = {
  set (key, config = {}) {
    if (this.$keys.indexOf(key) > -1) {
      // 一个key能且只能被注册一次
      return
    }
    this._register(key, config)
  },
  commit (key, value) {
    if (this.$keys.indexOf (key) < 0) {
      this._register(key, {}) // TODO
    }
    this.$values[key] = value
    this.$listenersMap[key].notify(value)
  },
  createManager () {
    
  },
  listen(key, listener) {
    if (
      !listener
    ) {
      return
    }
    if (this.$keys.indexOf (key) < 0) {
      this.register(key, {}) // TODO
    }
    this.$listenersMap[key].add(listener)
    listener(this.$values[key])
  },
  _register (key, config) {
    // 标记 key
    this.$keys.push(key)
    // 初始化
    this.$values[key] = config.value
    if (config.provider) {
      config.provider(getInserter(this, key))
    }
    // 订阅容器
    const listeners = new Listeners([])
    this.$listenersMap[key] = listeners
  },
  unlisten (key, listener) {
    if (
      this.$keys.indexOf (key) < 0
    ) {
      return
    }
    if (listener) {
      this.$listenersMap[key].delete(listener)
    } else {
      this.$listenersMap[key].clear()
    }
  },
}

Bucket.prototype = Object.assign(Bucket.prototype, BucketExtends)

export default Bucket
