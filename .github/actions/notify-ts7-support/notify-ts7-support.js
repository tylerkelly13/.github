module.exports = async ({ github, context }) => {
  const marker = "<!-- ts7-eslint-support-check -->";
  const info = JSON.parse(process.env.TS7_RESULT);

  const { data: comments } = await github.rest.issues.listComments({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.payload.pull_request.number,
  });
  if (comments.some((c) => c.body.includes(marker))) return;

  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: context.payload.pull_request.number,
    body: `${marker}\n@tylerkelly13 heads up: \`@typescript-eslint/typescript-estree\`'s peerDependencies.typescript is now \`${info.range}\`, which appears to allow TypeScript 7.x. The typescript pin (added for typescript-eslint/typescript-eslint#12518) may be safe to remove — worth a quick check before unpinning.`,
  });
};
