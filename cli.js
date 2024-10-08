#! /usr/bin/env node

const path = require("path")

const { Particle } = require("scrollsdk/products/Particle.js")
const { Utils } = require("scrollsdk/products/Utils.js")
const { Disk } = require("scrollsdk/products/Disk.node.js")
const { ScrollFile, ScrollFileSystem, ScrollCli } = require("scroll-cli")
const { ScrollSetCLI } = require("scroll-cli/ScrollSetCLI.js")

const dataPath = path.join(__dirname, "data")

if (!Disk.exists(dataPath)) Disk.mkdir(dataPath)

class NewsCli extends ScrollSetCLI {
  async buildCommand() {}

  // fetch builder data
  async fetchCommand() {
    const builders = require("./builders.json")
    await Promise.all(
      builders.map(async (builder) =>
        this.downloadFileToDisk(
          builder.data,
          path.join(dataPath, builder.buildername + ".scroll"),
        ),
      ),
    )
  }

  async downloadFileToDisk(url, destination) {
    if (!url) return
    const { writeFile } = require("fs").promises
    const response = await fetch(url)
    const fileBuffer = await response.arrayBuffer()
    await writeFile(destination, Buffer.from(fileBuffer))
  }
}

module.exports = { NewsCli }

if (!module.parent)
  Utils.runCommand(new NewsCli(), process.argv[2], process.argv[3])
