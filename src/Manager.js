const Manager = function (bucket) {
  this.$bucket = bucket
  this.$keys = []
  this.$listenersMap = {}
}

Manager.prototype = {
  listen(key, listener) {
    if (
      !listener ||
      !key
    ) {
      return
    }
    if (this.$keys.indexOf (key) < 0) {
      this.$keys.push(key)
      this.$listenersMap[key] = []
    }
    this.$listenersMap[key].push(listener)
    this.$bucket.listen(key, listener)
  },
  unlisten (key, listener) {
    // 如果不是此 manager 添加的监听。则不允许取消监听
    if (
      !key ||
      this.$keys.indexOf (key) < 0
    ) {
      return
    }
    const bucket = this.$bucket
    if (listener) {
      const listenersPart = this.$listenersMap[key]
      const index = listenersPart.indexOf(listener) > -1
      if (index > -1) {
        listenersPart.splice(listener)
        bucket.unlisten(key, listener)
      }
    } else {
      this.$listenersMap[key].forEach(listener => {
        bucket.unlisten(key, listener)
      })
      this.$listenersMap[key] = []
    }
  },
  clear () {
    const keys = Object.keys(this.$listenersMap)
    const bucket = this.$bucket
    keys.forEach(key => {
      const listeners = this.$listenersMap[key]
      listeners.forEach(listener => {
        bucket.unlisten(key, listener)
      })
    })
    this.$keys = []
  }
}

export default Manager