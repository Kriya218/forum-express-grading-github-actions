const categoryService = require('../../services/category-service')

const categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, (err, data) => err ? next(err) : res.json(data))
  },
  postCategory: (req, res, next) => {
    categoryService.postCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  putCategory: (req, res, next) => {
    categoryService.putCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
  },
  deleteCategory: (req, res, next) => {
    categoryService.deleteCategory(req, (err, data) => err ? next(err) : res.json({ status: 'success', data }))
      .then(() => res.redirect('/admin/categories'))
  }
}

module.exports = categoryController
