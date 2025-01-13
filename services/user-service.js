const bcrypt = require('bcryptjs')
const { User, Restaurant, Comment } = require('../models')
const { localFileHandler } = require('../helpers/file-helpers')
const { getUser } = require('../helpers/auth-helpers')
const { checkRepeat } = require('../helpers/check-repeat')

const userController = {
  signUp: (req, cb) => {
    if (req.body.password !== req.body.passwordCheck) throw new Error('Password do not match!')
    User.findOne({ where: { email: req.body.email } })
      .then(user => {
        if (user) throw new Error('Email already exist!')
        return bcrypt.hash(req.body.password, 10)
      })
      .then(hash => User.create({
        name: req.body.name,
        email: req.body.email,
        password: hash
      }))
      .then(user => cb(null, user))
      .catch(err => cb(err))
  },
  getUser: (req, cb) => {
    const userId = getUser(req).id
    return User.findByPk(req.params.id, {
      include: [
        { model: Comment, include: Restaurant },
        { model: Restaurant, as: 'FavoritedRestaurants' },
        { model: User, as: 'Followers' },
        { model: User, as: 'Followings' }
      ],
      order: [[{ model: Comment }, 'createdAt', 'DESC']]
    })
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        const editedUser = {
          ...user.toJSON(),
          commentRests: checkRepeat(user.Comments, 'restaurantId'),
          commentsCounts: checkRepeat(user.Comments, 'restaurantId').length,
          favoritedCount: user.FavoritedRestaurants.length,
          followersCount: user.Followers.length,
          followingsCount: user.Followings.length
        }
        cb(null, { user: editedUser, userId })
      })
      .catch(err => cb(err))
  },
  putUser: (req, cb) => {
    const { name } = req.body
    const { file } = req
    if (!name) throw new Error('User name is required!')
    return Promise.all([
      User.findByPk(req.params.id),
      localFileHandler(file)
    ])
      .then(([user, filePath]) => {
        if (!user) throw new Error("User didn't exist!")
        return user.update({
          name,
          image: filePath || user.image
        })
      })
      .then(user => cb(null, user))
      .catch(err => cb(err))
  },
  getTopUsers: (req, cb) => {
    return User.findAll({
      include: [{ model: User, as: 'Followers' }]
    })
      .then(users => {
        const results = users
          .map(user => ({
            ...user.toJSON(),
            followerCount: user.Followers.length,
            isFollowed: req.user.Followings.some(f => f.id === user.id)
          }))
          .sort((a, b) => b.followerCount - a.followerCount)
        return cb(null, { users: results })
      })
      .catch(err => cb(err))
  }
}

module.exports = userController
