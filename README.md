# AXIOME3 Web Application

## Installation

## Accessing the app

### If installed on a local machine (e.g. personal computer)
After installing the app, open the browser, and navigate to `localhost:8080`

### If installed on a remote machine (e.g. server)
#### If using SSH to access the server
1. Enable port forwarding

`ssh -L 8080:localhost:8080 USERNAME@REMOTE_SERVER` (`-L 8080:localhost:8080` forwards the remote port 8080 to local port 8080)

2. Open the browser, and navigate to `localhost:8080`

#### If using PuTTY to access the server