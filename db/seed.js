const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();

module.exports = async({ postsToCreate = 16, usersToCreate = 16, commentsToCreate = 16 } = {}) => {
  const loggedInUser = await User.create({
    username: 'vixen',
    password: 'password',
    profilePhotoUrl: 'awesome.jpeg'
  });
  
  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    username: chance.name(),
    password: chance.animal(),
    profilePhotoUrl: 'awesome.jpeg'
  })));

  const posts = await Post.create([...Array(postsToCreate)].map(() => ({
    photoUrl: chance.profession(),
    caption: chance.sentence(),
    user: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));
  
  await Comment.create([...Array(commentsToCreate)].slice(1).map(() => ({
    post: chance.pickone(posts),
    comment: chance.sentence(),
    commentBy: chance.weighted([loggedInUser, ...users], [2, ...users.map(() => 1)])._id
  })));
};




