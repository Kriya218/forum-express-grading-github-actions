const commentService = require('../../services/comment-service')

const commentController = {
  postComment: (req, res, next) => {
    commentService.postComment(req, (err, data) => err ? next(err) : res.redirect(`/restaurants/${data.id}`, data))
  },
  deleteComment: (req, res, next) => {
    commentService.deleteComment(req, (err, data) => err ? next(err) : res.redirect(`/restaurants/${data.id}`, data))
      .then(deletedComment => res.redirect(`/restaurants/${deletedComment.restaurantId}`))
  }
}

module.exports = commentController
