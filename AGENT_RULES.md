# Agent Operational Rules

## 1. Subagent & Browser Reliability
- **ALWAYS** check if the target server (e.g., Storybook at port 6006) is running *before* launching a browser subagent.
- If the link is dead or connection is refused, **RESTART** the server (e.g., `npm run storybook`) immediately. Do not fail the task without attempting to fix the environment.
- Verify the server is ready (e.g., by waiting for "started" output) before proceeding.

## 2. Visual Verification
- Visual verification images must be inspected manually. Do not trust the subagent's "success" message if the screenshot shows an error page.
