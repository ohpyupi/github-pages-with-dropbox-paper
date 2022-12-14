require('dotenv').config();

module.exports = {
    DROPBOX_GITHUB_PAGES_FOLDER: process.env.DROPBOX_GITHUB_PAGES_FOLDER,
    DROPBOX_AUTH_REFRESH_TOKEN: process.env.DROPBOX_AUTH_REFRESH_TOKEN,
    DROPBOX_AUTH_APP_KEY: process.env.DROPBOX_AUTH_APP_KEY,
    DROPBOX_AUTH_APP_SECRET: process.env.DROPBOX_AUTH_APP_SECRET,
    BASE_URL_GITHUB_PAGES: process.env.BASE_URL_GITHUB_PAGES
};
