# AXIOME3 Web Application Wiki

## Prerequisites
1. Docker (1.13.0+) https://docs.docker.com/get-docker/
2. Docker-compose (3.0+) https://docs.docker.com/compose/install/

## Email Notification
You will need a gmail credential to use the email notification service. Due to security reason, we purposely do not make the credential file publicly available. If you wish to use this service, please send an email to `sjmin@uwaterloo.ca` asking for the credential file.

After receiving the credential file, place this file in the `backend` directory to use the email notification service.

## Installation and Usage

If you wish to install AXIOME3 in the remote server that is accessible via SSH, please take a look at [*Accessing the app installed in the remote server*](#accessing-the-app-installed-in-the-remote-server) section for more details.

### Installation and Termination
1. Clone this repository (to the location you want to install the application)

   `git clone https://github.com/neufeld/AXIOME3-GUI.git`
  
2. Run the following command to install and launch `AXIOME3-GUI` app. This may take some time to run if running for the first time.

   *Make sure AXIOME3-GUI is not already running!*

   *Note that once the above command is run, it will create and save Docker images. After the first installation, you can launch the app with the same command (it will take much less time since the app is already installed.)*

   `docker-compose -f docker-compose_production.yml up -d`

   The above command will launch the app in the background.

   If you want to launch the app in the foreground, use the following command instead. (you will see verbose messages if running in the foreground)

   `docker-compose -f docker-compose_production.yml up`

3. To cleanly exit the app, run the following command. (If running the app in the foreground, press `CTRL+c` to terminate the app first.)

   `docker-compose -f docker-compose_production.yml down`

4. Then, remove Docker data volumes used in `AXIOME3-GUI` by running the command,

   `docker volume prune`

5. If you wish to uninstall the app, run the following command. It will remove AXIOME3-GUI Docker images. (you may need sudo/admin privilege)

   `docker image rm axiome3-gui_app axiome3-gui_backend axiome3-gui_pipeline_worker axiome3-gui_extension_worker`
   
### Usage
1. Open web browser (currently supports Chrome, Edge, Firefox), and navigate to `localhost:8080` in the address bar.

2. A detailed usage tutorial can be found [here](https://github.com/neufeld/AXIOME3-GUI/wiki/Tutorial---Main).

***Note: There are some known installation bugs. See the "Known Issues" section for dealing with the bugs if you ever encounter one***

## Accessing the app installed in the remote server

_**Note that you need to be able to access server or compute cluster via ssh!**_

### If using SSH command to access server
1. Access remote server or cluster with port forwarding enabled by adding `-L` flag to the `ssh` command. (other flags can also be added if needed)

`ssh -L 8080:localhost:8080 USERNAME@REMOTE_SERVER` (`-L 8080:localhost:8080` forwards the remote port 8080 to local port 8080)

*Make sure other apps ARE NOT running on port 8080 on local PC and remote server!*

2. Navigate to the direcory to install `AXIOME3-GUI` application.

3. Install `AXIOME3-GUI` application as described in [*Installation and Usage*](#installation-and-usage) section.

4. On your local PC, open web browser, and navigate to `localhost:8080` to use `AXIOME3`.

### If using PuTTY to access the server
1. Expand the SSH tab by clicking on the `+` sign

![putty_1](https://github.com/neufeld/AXIOME3-GUI/blob/master/tutorial_img/putty_1.png)

2. Click on Tunnels tab

![putty_1](https://github.com/neufeld/AXIOME3-GUI/blob/master/tutorial_img/putty_2.png)

3. In the `Source port`, enter 8080. In the `Destination`, enter 127.0.0.1:8080. Click `Add` to add this tunnel

![putty_1](https://github.com/neufeld/AXIOME3-GUI/blob/master/tutorial_img/putty_3.png)

4. Go back to the `Session` tab, and save this setting (either overwrite to existing one, or save it as a new session), so that you don't have to do this every time you want to use AXIOME3 GUI.
## Known Issues
Please take a look at [Known Issues section](https://github.com/neufeld/AXIOME3-GUI/wiki/Known-Issues) for more details.

## Collaboration
Please refer to [Collaboration section](https://github.com/neufeld/AXIOME3-GUI/wiki/Collaboration) for more details.
