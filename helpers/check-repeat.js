module.exports = {
  checkRepeat: (arr, key) => {
    const checked = new Set()
    return arr.filter(obj => {
      const value = obj[key]
      if (!checked.has(value)) {
        checked.add(value)
        return true
      }
      return false
    })
  }
}
