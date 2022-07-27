# Create a Dropbox application

To create a new Dropbox application, go to [App Console], and click the `Create app` button.

<p align="center">
    <img src="create-dropbox-app.png" width="640">
</p>

On the next screen, you will be asked to select app configurations, `scope`,
`access type`, `app name`, and `your Dropbox account` (only for users who linked Dropbox accounts).

Select the configurations like the below screenshot, and click `Create app` button once all is done.

<p align="center">
    <img src="app-config.png" width="640">
</p>

Go to `Settings` tab, and add "http://localhost" to the `Redirect URIs` section. The redirect URI
will be used when minting authorization code and long-lived refresh token later.

<p align="center">
    <img src="app-redirect-uri.png" width="640">
</p>

Go to `Permission` tab, and check the permission `files.content.read`. This permission is needed
to export [Dropbox Paper] docs.

<p align="center">
    <img src="app-permission.png" width="640">
</p>

Now, you're all set with the Dropbox app configuration!

[App Console]: https://www.dropbox.com/developers/apps
[Dropbox Paper]: https://www.dropbox.com/paper
