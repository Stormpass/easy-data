import Listeners from './libs/Listeners'
function Writable() {
  this._value = value
  this._listeners = new Listeners()
}

Writable.prototype.take = function (listener) {
  if (!listener) {
    return console.error('take 方法需要一个参数，且必须为 Function')
  }
  // 添加监听
  this._listeners.add(listener)
  // 马上通知 一次
  listener(this._value)
}

Writable.prototype.untake = function (listener) {
  if (listener) {
    this._listeners.delete(listener)
  } else {
    this._listeners.clear()
  }
}

Writable.prototype.set = function (value) {
  // 更新值
  this._value = value
  // 通知所有的订阅者
  this._listeners.notify(value)
}

Writable.prototype.get = function () {
  return this._value
}

export default function writable(value) {
  return new Writable(value)
}