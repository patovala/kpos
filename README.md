# kpos
Punto de Venta (POS) simple usando MEAN

## howto
  EndPoint:
  yo angular-fullstack:endpoint message

### Development

- Fork it
- Work in your repo
- Rebase with patovala repo master
- Create the pull request. Make sure your branch is rebased and travis is passing.

### Rebase with patovala repo master

- Add remote patovala's repo ( you need to add the remote one)
`git remote add upstream https://github.com/patovala/kpos.git`
- Fetch all the branches of that remote into remote-tracking branches
`git fetch upstream`
- Rebase your branch against patovala's branch
`git rebase upstream/master`

### How to squash your changes

Is important for us to have only one commit per history/bug. So, when you
send a PR, please make sure you are sending only 1 commit.

- See your log to get the SHA1 of the latest commit that is not from you

`git log`

Copy the latest commit SHA1 that is not from you

- Rebase in interactive mode with the latest SHA1 that is not from you

`git rebase -i SHA1commit`

- Pick the first commit and marked as fixup rest of your commits

```
pick 1234 your commit message

f 2345 commit 2

f 3456 commit 3
```
