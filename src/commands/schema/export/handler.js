const fs = require('fs');

module.exports = async (argv, ctx) => {
  const schema = await ctx.client.exportSchema();

  const result = {
    tables: schema.tables.items,
    version: ctx.pkg.version
  };

  fs.writeFileSync(argv.file, JSON.stringify(result, null, 2));
};
