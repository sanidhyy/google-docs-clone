import { query } from './_generated/server';

export const get = query({
  handler: async (ctx) => {
    return await ctx.db.query('documents').collect();
  },
});
