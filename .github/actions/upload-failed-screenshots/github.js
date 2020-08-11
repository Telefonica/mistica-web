// @ts-check
const github = require('@actions/github');
const core = require('@actions/core');

const githubToken = core.getInput('GITHUB_TOKEN');
const context = github.context;
const octokit = github.getOctokit(githubToken);

const fetchPullRequestComments = async () => {
    if (context.eventName === 'pull_request') {
        return octokit.issues.listComments({
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
 */
const commentPullRequest = async (message) => {
    if (!context.payload.pull_request) {
        core.setFailed('No pull request found');
        return;
    }

    const firstLine = message.trim().split('\n')[0];
    const commentId = await findPullRequestComment(firstLine);

    if (commentId) {
        await octokit.issues.updateComment({
            ...context.repo,
            comment_id: commentId,
            body: message,
        });
    } else {
        await octokit.issues.createComment({
            ...context.repo,
            issue_number: context.issue.number,
            body: message,
        });
    }
};

module.exports = {commentPullRequest};
