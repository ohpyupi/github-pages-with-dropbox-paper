const fetch = require('cross-fetch');
const DROPBOX_API_V2_URL = 'https://api.dropboxapi.com/2';
const DROPBOX_CONTENT_API_V2_URL = 'https://content.dropboxapi.com/2';
const DROPBOX_AUTH_URL = "https://api.dropboxapi.com/oauth2";

const dropboxAuthToken = async ({ refreshToken, clientId, clientSecret, grantType  }) => {
    const endpoint = `${DROPBOX_AUTH_URL}/token`; 
    const result = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            refresh_token: refreshToken,
            grant_type: grantType,
        }),
    });
    return await result.json();
};

const dropboxFilesListFolder = async ({ accessToken, folderPath }) => {
    const endpoint = `${DROPBOX_API_V2_URL}/files/list_folder`;
    const result = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
	        path: folderPath
        })
    });
    return await result.json();
};

const dropboxFilesExport = async ({ accessToken, paperDocPath, format }) => {
    const endpoint = `${DROPBOX_CONTENT_API_V2_URL}/files/export`;
    const result = await fetch(endpoint, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Dropbox-API-Arg': JSON.stringify({
                path: paperDocPath,
                export_format: format,
            }),
        },
    });
    return await result.text();
};

module.exports = {
    dropboxAuthToken,
    dropboxFilesListFolder,
    dropboxFilesExport
};
