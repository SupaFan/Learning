const user = {}
user.staticName = '1'
user.staticFn = function () {
  console.log(user.staticName)
}
module.exports = user