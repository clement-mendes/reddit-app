module.exports = {
  disableEmoji: false,
  format: '{type}{scope}: {emoji}{subject}',
  list: ['test', 'feat', 'fix', 'docs', 'refactor', 'style', 'perf'],
  maxMessageLength: 94,
  minMessageLength: 3,
  questions: ['type', 'subject', 'body'],
  scopes: [],
  types: {
    docs: {
      description: 'Documentation only changes',
      emoji: '✏️',
      value: 'docs',
    },
    feat: {
      description: 'A new feature',
      emoji: '🎸',
      value: 'feat',
    },
    fix: {
      description: 'A bug fix',
      emoji: '🐛',
      value: 'fix',
    },
    perf: {
      description: 'A code change that improves performance',
      emoji: '⚡️',
      value: 'perf',
    },
    refactor: {
      description: 'A code change that neither fixes a bug or adds a feature',
      emoji: '💡',
      value: 'refactor',
    },
    style: {
      description: 'Markup, white-space, formatting, missing semi-colons...',
      emoji: '💄',
      value: 'style',
    },
    test: {
      description: 'Adding missing tests',
      emoji: '💍',
      value: 'test',
    },
    messages: {
      type: "Select the type of change that you're committing:",
      subject: 'Write a short, imperative mood description of the change:\n',
      body: 'Provide a longer description of the change:\n ',
    },
  },
};
