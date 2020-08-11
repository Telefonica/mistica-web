const github = require('@actions/github');

const githubToken = core.getInput('GITHUB_TOKEN');
const context = github.context;
const octokit = new github.GitHub(githubToken);

const fetchPullRequestComments = async () => {
    if (context.eventName === 'pull_request') {
        return octokit.issues.listComments({
            ...context.repo,
            issue_number: context.issue.number,
        });
    }
    return [];
};

const findPullRequestComment = async (firstLine) => {
    const result = await fetchPullRequestComments();
    const comment = result.comments.find((comment) => comment.body.startsWith(firstLine));
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
