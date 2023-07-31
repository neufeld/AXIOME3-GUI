# AXIOME3 Web Application Wiki

## Prerequisites
1. Docker (23.0.1+) https://docs.docker.com/get-docker/
2. Docker Compose (2.16+) https://docs.docker.com/compose/install/

## Email Notification
You will need a gmail credential to use the email notification service. Due to security reason, we purposely do not make the credential file publicly available. If you wish to use this service, please send an email to `sjmin@uwaterloo.ca` asking for the credential file.

After receiving the credential file, place this file in the `backend` directory to use the email notification service.

## Installation and Usage

If you wish to install AXIOME3 in the remote server that is accessible via SSH, please take a look at [*Accessing the app installed in the remote server*](#accessing-the-app-installed-in-the-remote-server) section for more details.

### Installation and Termination
1. Clone this repository (to the location you want to install the application)

   `git clone https://github.com/neufeld/AXIOME3-GUI.git`

2. Set up your configuration. To do this, go into AXIOME3-GUI/docker_files and create a file named ".env". The content of the file should be:
   ```
   QIIME2_VERSION=XXX
   OUTPUT_PATH=XXX
   RABBITMQ_DEFAULT_USER=XXX
   RABBITMQ_DEFAULT_PASS=XXX
   RABBITMQ_DEFAULT_VHOST=XXX
   GMAIL_SENDER=XXX
   SILVA_VERSION=XXX
   ```

   For a default configuration, please feel free to use the following:
   ```
   QIIME2_VERSION=2020.6
   OUTPUT_PATH=/Analysis/AXIOME3/output
   RABBITMQ_DEFAULT_USER=axiome3
   RABBITMQ_DEFAULT_PASS=axiome3
   RABBITMQ_DEFAULT_VHOST=axiome3_host
   GMAIL_SENDER=youremail@gmail.com
   SILVA_VERSION=138
   ```

   Download your SILVA classifier (.qza) and put it in AXIOME3-GUI/pipeline so it is available locally when the app is built with docker. A default classifier that you can use is available at https://drive.google.com/uc?id=12jug9XZcbUefevtTnENGudjGqaAL0LCo

  
2. Run the following command to install and launch `AXIOME3-GUI` app. This may take some time to run if running for the first time.

   *Make sure AXIOME3-GUI is not already running!*

   *Note that once the above command is run, it will create and save Docker images. After the first installation, you can launch the app with the same command (it will take much less time since the app is already installed.)*

   `docker compose -p [CUSTOM_NAME] -f docker_files/docker-compose_production.yml up -d`

   The above command will launch the app in the background. The "-p" flag is optional and you do not need to give the docker app a custom name if you don't want to.

   If you want to launch the app in the foreground, use the following command instead. (you will see verbose messages if running in the foreground)

   `docker compose -p [CUSTOM_NAME] -f docker_files/docker-compose_production.yml up`

3. To cleanly exit the app, run the following command. (If running the app in the foreground, press `CTRL+c` to terminate the app first.)

   `docker compose -p [CUSTOM_NAME] -f docker-compose_production.yml down`

4. Then, remove Docker data volumes used in `AXIOME3-GUI` by running the command,

   `docker volume prune`

5. If you wish to uninstall the app, you will need to remove the AXIOME3-GUI Docker images (you may need sudo/admin privilege). For instructions on removing docker images, please refer to: https://www.digitalocean.com/community/tutorials/how-to-remove-docker-images-containers-and-volumes#removing-docker-images


   
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
