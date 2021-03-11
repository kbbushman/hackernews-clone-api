let links = [{
  id: 'link-0',
  url: 'www.howtographql.com',
  description: 'Fullstack tutorial for GraphQL'
}];

let idCount = links.length;

module.exports = {
  Query: {
    info: () => 'This is the Hackernews Clone API',
    feed: () => links,
    link: (parent, args) => {
      return links.find((link) => link.id === args.id);
    }
  },
  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    update: (parent, args) => {
      const linkToUpdate = links.find((link) => link.id === args.id);
      linkToUpdate.url = args.url ? args.url : linkToUpdate.url;
      linkToUpdate.description = args.description ? args.description : linkToUpdate.description;
      return linkToUpdate;
    },
  },
};
