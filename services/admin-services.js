const { Restaurant, Category } = require('../models')

const adminController = {
  getRestaurants: (req, callback) => {
    return Restaurant.findAll({
      raw: true,
      nest: true,
      include: [Category]
    })
      .then(restaurants => callback(null, { restaurants }))
      .catch(err => callback(err))
  }
}

module.exports = adminController
