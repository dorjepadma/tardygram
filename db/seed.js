const User = require('../lib/models/User');
const Post = require('../lib/models/Post');
// const Comment = require('../lib/models/Comment');
const chance = require('chance').Chance();


module.exports = async({ postToCreate = 16, } = {}) => {
  
  const users = await User.create([...Array(usersToCreate)].slice(1).map(() => ({
    email: chance.email(),
    password: chance.animal()
  })));

  const username = ['@happyvixen', '@mellowdude', '@spunkypuppy'];
  const posts = await Post.create([...Array(postToCreate)].map(() => ({
    userId: chance.pickone(username),
    photoUrl: 'https://picsum.photos/200/300',
    caption: chance.sentence(),
    tags: chance.word()
  })));

  // await Comment.create([...Array(commentsToCreate)].map(() => ({
  //   postId: chance.pickone(posts)._id,
  //   userId: chance.pickone(username),
  //   caption: chance.sentence(),
  //   tags: chance.word()
  // })));
};
// commentsToCreate = 16



