workflow "Build and lint" {
  on = "push"
  resolves = [
    "Build project",
    "Lint project"
  ]
}

action "Don't skip CI" {
  uses = "ffflorian/actions/last_commit@master"
  args = "^(?:(?!\\[(ci skip|skip ci)\\]).)*$"
}

action "Install dependencies" {
  uses = "./.github/actions/node-bzip2"
  needs = "Don't skip CI"
  runs = "yarn"
}

action "Build project" {
  uses = "./.github/actions/node-bzip2"
  needs = "Install dependencies"
  runs = "yarn"
  args = "dist"
}

action "Lint project" {
  uses = "./.github/actions/node-bzip2"
  needs = "Install dependencies"
  runs = "yarn"
  args = "lint"
}
