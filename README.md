# AXIOME3 Web Application

## Prerequisites
1. Docker (1.13.0+) https://docs.docker.com/get-docker/
2. Docker-compose (3.0+) https://docs.docker.com/compose/install/

## Installation
1. Clone this repository (to the location you want to install the application)

   `git clone https://github.com/neufeld/AXIOME3-GUI.git`
  
2. Run the following command

   `docker-compose -f docker-compose_production.yml up`
   
3. Open web browser (currently support Chrome, Edge, Firefox), and go to `localhost:8080`

4. If you install AXIOME3 in the remote server that is accessible using SSH, please take a look at *Accessing the app installed in the remote server (that's accessible via SSH)* section for more details

***Note: There are some known installation bugs. See the "Known Bugs" section for dealing with the bugs if you ever encounter one***

## Accessing the app installed in the remote server (that's accessible via SSH)

### If installed on a local machine (e.g. personal computer)
After installing the app, open the browser, and navigate to `localhost:8080`

### If installed on a remote machine (e.g. server)
#### If using SSH to access the server
1. Enable port forwarding

`ssh -L 8080:localhost:8080 USERNAME@REMOTE_SERVER` (`-L 8080:localhost:8080` forwards the remote port 8080 to local port 8080)

2. Open the browser, and navigate to `localhost:8080`

#### If using PuTTY to access the server

## Known Bugs
