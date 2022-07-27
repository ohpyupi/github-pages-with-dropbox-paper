const fs = require("fs");
const path = require("path");
const assert = require("assert");
const {
    DROPBOX_GITHUB_PAGES_FOLDER,
    DROPBOX_AUTH_REFRESH_TOKEN,
    DROPBOX_AUTH_APP_KEY,
    DROPBOX_AUTH_APP_SECRET,
} = require('./env');
const {
    dropboxAuthToken,
    dropboxFilesListFolder,
    dropboxFilesExport
} = require('./services/dropbox');
const { convertMapToFrontMatter } = require('./utils/markdown');
const fsPromises = fs.promises;

const getPostNameForDropboxPaper = ({ name, server_modified }) => {
    const [paperDocName] = name.split('.paper');
    const [updatedAt] = server_modified.split('T');
    return `${updatedAt}-${paperDocName}.md`;
};

const main = async () => {
    console.log("Starting to build...");
    assert(DROPBOX_AUTH_REFRESH_TOKEN);
    assert(DROPBOX_AUTH_APP_KEY);
    assert(DROPBOX_AUTH_APP_SECRET);
    assert(DROPBOX_GITHUB_PAGES_FOLDER);

    const ROOT_PATH = path.join(__dirname, "..");
    const PAPER_DOC_PATH = path.join(ROOT_PATH, "_posts");

    fs.existsSync(PAPER_DOC_PATH) && fs.rmSync(PAPER_DOC_PATH, { recursive: true });
    fs.mkdirSync(PAPER_DOC_PATH);

    const { access_token: accessToken } = await dropboxAuthToken({
        clientId: DROPBOX_AUTH_APP_KEY,
        clientSecret: DROPBOX_AUTH_APP_SECRET,
        grantType: "refresh_token",
        refreshToken: DROPBOX_AUTH_REFRESH_TOKEN,
    });

    const { entries } = await dropboxFilesListFolder({
        folderPath: DROPBOX_GITHUB_PAGES_FOLDER,
        accessToken
    });

    const paperDocs = entries.filter(entry => entry.is_downloadable === false && entry.path_lower.includes(".paper"));

    for (const paperDoc of paperDocs) {
        const exported = await dropboxFilesExport({ paperDocPath: paperDoc.path_lower, format: "markdown", accessToken });
        const postName = getPostNameForDropboxPaper(paperDoc);
        console.log(`-> Exported ${postName}`);
        const indexOfTitle = exported.indexOf('\n');
        const title = exported.slice(0, indexOfTitle);
        const post = exported.slice(indexOfTitle)
        const parsedTitle = title.split("# ").pop();
        const frontMatter = convertMapToFrontMatter({
            layout: "post",
            title: parsedTitle,
        });
        await fsPromises.writeFile(`${PAPER_DOC_PATH}/${postName}`, frontMatter + post);
    }

    console.log("Completed building!");
};

main();
