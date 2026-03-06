# TODO

- learn and integrate tailwind utilities in @/styles/utilities and link them
- learn and integrate tailwind variables in @/styles/variables and link them
- learn and integrate tailwind themes,dark mode, breakpoints,animations,transitions,keyframes,plugins,aspect ratios,aspect ratios,aspect ratios in @/styles/themes and link them
- stable auth system

## Git Workflow & Commit Conventions

This project uses Husky, commitlint, and lint-staged to enforce code quality and consistent commit messages.

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<optional scope>): <description>

<optional body>

<optional footer>
```

#### Types
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, missing semi-colons, etc)
- `refactor`: Code changes that neither fix bugs nor add features
- `perf`: Performance improvements
- `test`: Adding or fixing tests
- `build`: Changes to build process or external dependencies
- `ci`: Changes to CI configuration
- `chore`: Other changes that don't modify src or test files
- `revert`: Reverts a previous commit

#### Examples
```
feat: add user authentication
fix(api): handle null response from server
docs: update installation instructions
```

### Pre-commit Hooks

The following checks run automatically before each commit:
- Linting of staged files
- Commit message validation

If any check fails, the commit will be aborted. Fix the issues and try again.
