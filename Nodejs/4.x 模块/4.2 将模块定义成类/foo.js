const user = function(name, age) {
  this._name = name
  this._age =age
}

user.prototype = {
  getName  () {
    return this._name
  },
}
user.prototype.getAge = function () {
  return this._age
}

module.exports = user