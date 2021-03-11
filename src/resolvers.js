let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

module.exports = {
  Query: {
    info: () => 'This is the Hackernews Clone API',
    feed: () => links,
    link: (parent, args) => {
      return links.find((link) => link.id === args.id);
    }
  },
};
