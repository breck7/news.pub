#! /usr/bin/env node

const path = require("path")

const { Particle } = require("scrollsdk/products/Particle.js")
const { Utils } = require("scrollsdk/products/Utils.js")
const { Disk } = require("scrollsdk/products/Disk.node.js")
const { ScrollFile, ScrollFileSystem, ScrollCli } = require("scroll-cli")
const { ScrollSetCLI } = require("scroll-cli/ScrollSetCLI.js")

class NewsCli extends ScrollSetCLI {
  async buildCommand() {
    console.log("Done")
  }

  // fetch user data
  async fetchCommand() {}
}

module.exports = { NewsCli }

if (!module.parent)
  Utils.runCommand(new NewsCli(), process.argv[2], process.argv[3])
