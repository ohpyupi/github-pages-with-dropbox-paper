const path = require('path');
const writeYamlFile = require('write-yaml-file')
const assert = require("assert");
const { BASE_URL_GITHUB_PAGES } = require("./env");

/*
 * The script allows updating the Jekyll config if you want to
 * programmatically update the Jekyll config file.
 * If it's static change, just directly update the _config.yaml.
 */
const main = async () => {
    const { loadYamlFileSync } = await import("load-yaml-file");
    const CONFIG_PATH = path.join(__dirname, "../_config.yml");
    const jekyllConfig = loadYamlFileSync(CONFIG_PATH)
    assert(jekyllConfig, "missing Jekyll config object")
    if (BASE_URL_GITHUB_PAGES) {
        jekyllConfig.baseurl = BASE_URL_GITHUB_PAGES;
    }
    writeYamlFile.sync(CONFIG_PATH, jekyllConfig);
};

main();
