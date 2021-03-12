function info(parent, args, context, info) {
  return 'This is the Hackernews Clone API';
}

function feed(parent, args, context, info) {
  return context.prisma.link.findMany();
}
function link(parent, args, context, info) {
  return context.prisma.link.findUnique({
    where: {
      id: Number(args.id),
    },
  });
}

module.exports = {
  info,
  feed,
  link,
};
