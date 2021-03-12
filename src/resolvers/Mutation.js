const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserId } = require('../utils');

async function signup(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } });
  if (user) {
    throw new Error('Account already exists. Please login');
  }

  const password = await bcrypt.hash(args.password, 10);

  const newUser = await context.prisma.user.create({ data: { ...args, password } });

  const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET);

  return {
    token,
    user: newUser,
  };
}

async function login(parent, args, context, info) {
  const user = await context.prisma.user.findUnique({ where: { email: args.email } });
  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return {
    token,
    user,
  };
}

async function post(parent, args, context, info) {
  const { userId } = getUserId(context);

  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    }
  });

  context.pubsub.publish('NEW_LINK', newLink);

  return newLink;
}

async function update(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.link.update({
    where: {
      id: Number(args.id),
    },
    data: {
      url: args.url,
      description: args.description,
    }
  });
}

async function destroy(parent, args, context, info) {
  const { userId } = context;

  return await context.prisma.link.delete({
    where: {
      id: Number(args.id),
    },
  });
}

module.exports = {
  signup,
  login,
  post,
  update,
  destroy,
};
