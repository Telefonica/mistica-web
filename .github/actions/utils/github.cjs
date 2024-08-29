// @ts-check
const github = require('@actions/github');
const core = require('@actions/core');

const githubToken = core.getInput('github-token', {required: true});
const context = github.context;
const octokit = github.getOctokit(githubToken);

const fetchPullRequestComments = async () => {
    if (context.eventName === 'pull_request') {
        return octokit.rest.issues.listComments({
            ...context.repo,
            issue_number: context.issue.number,
        });
    }
    return null;
};

const findPullRequestComment = async (firstLine) => {
    const {data} = await fetchPullRequestComments();
    const comment = data.find((comment) => comment.body.startsWith(firstLine));
    return comment ? comment.id : null;
};

/**
 * @param {string} message
 * @param {{updateOnly?: boolean}} options
 */
const commentPullRequest = async (message, {updateOnly = false} = {}) => {
    if (!context.payload.pull_request) {
        return;
    }

    const firstLine = message.trim().split('\n')[0];
    const commentId = await findPullRequestComment(firstLine);

    if (commentId) {
        await octokit.rest.issues.updateComment({
            ...context.repo,
            comment_id: commentId,
            body: message,
        });
    } else if (!updateOnly) {
        await octokit.rest.issues.createComment({
            ...context.repo,
            issue_number: context.issue.number,
            body: message,
        });
    }
};

module.exports = {commentPullRequest};
