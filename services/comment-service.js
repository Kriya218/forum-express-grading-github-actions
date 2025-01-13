const { Restaurant, User, Comment } = require('../models')

const commentController = {
  postComment: (req, cb) => {
    const { restaurantId, text } = req.body
    const userId = req.user.id
    if (!text) throw new Error('Comment text is required!')
    return Promise.all([
      Restaurant.findByPk(restaurantId),
      User.findByPk(userId)
    ])
      .then(([restaurant, user]) => {
        if (!restaurant) throw new Error("Restaurant didn't exist!")
        if (!user) throw new Error("User didn't exist!")
        return Comment.create({
          text,
          restaurantId,
          userId
        })
          .then(comment => cb(null, comment))
          .catch(err => cb(err))
      })
  },
  deleteComment: (req, cb) => {
    return Comment.findByPk(req.params.id)
      .then(comment => {
        if (!comment) throw new Error("Comment didn't exist!")
        return comment.destroy()
      })
      .then(deletedComment => cb(null, deletedComment))
      .catch(err => cb(err))
  }
}

module.exports = commentController
