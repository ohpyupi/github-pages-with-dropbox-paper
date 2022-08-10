const readline = require('readline');
const crypto = require("crypto");
const fetch = require("cross-fetch");
const DROPBOX_APP_ID = "1k72qtj2uesah0u";
const DROPBOX_AUTH_CODE_URL = "https://www.dropbox.com/oauth2/authorize";
const DROPBOX_AUTH_TOKEN_URL = "https://api.dropboxapi.com/oauth2/token";
const { dropboxAuthToken } = require("./services/dropbox");

const base64Encode = (buffer) => {
    return buffer.toString("base64")
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

const sha256 = (buffer) => {
    return crypto.createHash('sha256').update(buffer).digest();
}

const openAuthCodeUrl = () => {
    const codeVerifier = base64Encode(crypto.randomBytes(32));
    const codeChallenge = base64Encode(sha256(codeVerifier));
    const authCodeUrl = `${DROPBOX_AUTH_CODE_URL}?client_id=${DROPBOX_APP_ID}&response_type=code&code_challenge=${codeChallenge}&code_challenge_method=S256&token_access_type=offline`
    return [codeVerifier, authCodeUrl];
};

/**
 * @doc: https://dropbox.tech/developers/pkce--what-and-why-
 */
const main = () => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    console.log("Initiating Dropbox OAuth flow...");
    const [codeVerifier, authCodeUrl] = openAuthCodeUrl();
    console.log(`[1] Visit the following URL to get auth code: ${authCodeUrl}`);
    rl.question("[2] Enter the auth code from [1]:\n", async (code) => {
        const { refresh_token: refreshToken } = await dropboxAuthToken({
            code,
            codeVerifier,
            grantType: "authorization_code",
            clientId: DROPBOX_APP_ID,
        });
        console.log(`Generated a refresh token: ${refreshToken}`);
        rl.close();
    });
};

main();
