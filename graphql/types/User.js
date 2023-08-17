builder.prismaObject('User', {
    // Optional name for the object, defaults to the name of the prisma model
    name: 'PostAuthor',
    fields: (t) => ({
      id: t.exposeID('id'),
      email: t.exposeString('email'),
    }),
  });
  
  builder.prismaObject('Post', {
    fields: (t) => ({
      id: t.exposeID('id'),
      title: t.exposeString('title'),
    }),
  });
  