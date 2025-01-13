const categoryService = require('../../services/category-service')

const categoryController = {
  getCategories: (req, res, next) => {
    categoryService.getCategories(req, (err, data) => err ? next(err) : res.render('admin/categories', data))
  },
  postCategory: (req, res, next) => {
    categoryService.postCategory(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Category was successfully created')
      req.session.createdCategory = data
      res.redirect('/admin/categories')
    })
  },
  putCategory: (req, res, next) => {
    categoryService.putCategory(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Category was successfully edited')
      req.session.createdCategory = data
      res.redirect('/admin/categories')
    })
  },
  deleteCategory: (req, res, next) => {
    categoryService.deleteCategory(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'Category was successfully deleted')
      req.session.deletedCategory = data
      res.redirect('/admin/categories')
    })
  }
}

module.exports = categoryController
