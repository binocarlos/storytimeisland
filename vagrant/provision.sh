#!/bin/sh
#
# @(#)$Id$
#
# Quarry.io install script
# 
# Install the base software for running on a machine

hostname dev.storytimeisland.com

sudo apt-get install python-software-properties python g++ make
sudo apt-get install build-essential git curl -y
sudo apt-get install libgmp3-dev -y
sudo apt-get install imagemagick -y
sudo apt-get install libxml2 libxml2-dev -y
sudo add-apt-repository ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install nodejs

echo "dev.storytimeisland.com installed"

# where to download source for compiling
#sources_folder="/home/vagrant/.sources"
#mkdir -p $sources_folder

# Mongo apt-get keys
#apt-key adv --keyserver keyserver.ubuntu.com --recv 7F0CEB10
#echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen" > /etc/apt/sources.list.d/10gen.list

# Salt keys
#echo deb http://ppa.launchpad.net/saltstack/salt/ubuntu `lsb_release -sc` main | sudo tee /etc/apt/sources.list.d/saltstack.list
#wget -q -O- "http://keyserver.ubuntu.com:11371/pks/lookup?op=get&search=0x4759FA960E27C0A6" | sudo apt-key add -

#apt-get install software-properties-common python-software-properties python g++ make -y
#add-apt-repository ppa:chris-lea/node.js -y
#apt-get update

#apt-get install build-essential git curl -y
#apt-get install redis-server -y
#apt-get install mongodb-10gen -y
#apt-get install libgmp3-dev -y
#apt-get install imagemagick -y
#apt-get install libxml2 libxml2-dev -y
#apt-get install netpbm -y
#apt-get install salt-master salt-minion -y
#apt-get install nodejs npm -y

##########################################################################################
# Download and make, install ZeroMQ (networking stack)
#zeromq_version="3.2.0"
#zeromq_file="zeromq-$zeromq_version-rc1.tar.gz"
#zeromq_url="http://download.zeromq.org/$zeromq_file"
#
#if [ ! -d "$sources_folder/mon" ]; then
#	(mkdir "$sources_folder/mon" && cd "$sources_folder/mon" && curl -L# https://github.com/visionmedia/mon/archive/master.tar.gz | tar zx --strip 1 && make install)
#fi
#
#if [ ! -d "$sources_folder/mongroup" ]; then
#	(mkdir "$sources_folder/mongroup" && cd "$sources_folder/mongroup" && curl -L# https://github.com/jgallen23/mongroup/archive/master.tar.gz | tar zx --strip 1 && make install)
#fi
#
# Only install ZeroMQ if it is not already installed
#if [ ! -d "$sources_folder/zeromq-$zeromq_version" ]; then
#	cd $sources_folder
#	curl -C - --progress-bar $zeromq_url -o "$zeromq_file"
#	tar -xzf $zeromq_file
#	cd "zeromq-$zeromq_version"
#	./configure
#	make
#	make install
#fi

##########################################################################################
# Download and make, install node.js

#nodejs_version="0.8.16"
#nodejs_file="node-v$nodejs_version.tar.gz"
#nodejs_url="http://nodejs.org/dist/v$nodejs_version/$nodejs_file"

# Only install node.js if it is not already installed
#if [ ! -d "$sources_folder/node-v$nodejs_version" ]; then
#	cd $sources_folder
#	installlog "downloading node.js version: $nodejs_version"
#	curl -C - --progress-bar $nodejs_url -o "$nodejs_file"
#	tar -xzf $nodejs_file
#	cd "node-v$nodejs_version"
#	installlog "building node.js version: $nodejs_version"
#	./configure
#	make
#	make install
#else
#	installlog "skipping node.js version: $nodejs_version already installed"
#fi

##########################################################################################
# Install node.js modules from NPM - this reads ../package.json for dependencies
# The ZeroMQ npm is different - ask the Administrator

#installlog "installing node modules"
#cd $quarryio_home
#npm install
#ldconfig