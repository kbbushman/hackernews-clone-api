module.exports = {
  Query: {
    info: () => 'This is the Hackernews Clone API',
    feed: async (parent, args, context) => {
      return context.prisma.link.findMany();
    },
    link: (parent, args, context) => {
      return context.prisma.link.findUnique({
        where: {
          id: Number(args.id),
        },
      });
    },
  },
  Mutation: {
    post: (parent, args, context) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description,
        },
      });
      return newLink;
    },
    update: (parent, args, context) => {
      const updatedLink = context.prisma.link.update({
        where: {
          id: Number(args.id),
        },
        data: {
          url: args.url,
          description: args.description,
        }
      });
      return updatedLink;
    },
    delete: (parent, args, context) => {
      const deletedLink = context.prisma.link.delete({
        where: {
          id: Number(args.id),
        },
      });
      return deletedLink;
    },
  },
};
