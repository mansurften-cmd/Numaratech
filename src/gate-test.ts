// DELIBERATE TYPE ERROR — proves Cloudflare refuses to deploy a change that
// fails `npm run build`. Not imported anywhere, so even an ungated deploy
// would change nothing on the site. Removed by the next commit.
export const gateTest: number = 'this is not a number';
