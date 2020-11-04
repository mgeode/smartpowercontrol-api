#!/bin/bash

path=$(find $(pwd) -type f -name "setupEnv.properties" -exec dirname {} \;)
source $path/setupEnv.properties

echo "Installing Dependencies for SPC-Server"
echo "Return to continue"
read

mkdir -p $libdir

if [ ! -d "$libdir/wiringPi" ]; then
	echo "Installing SENSOR"
	cd $libdir
	git clone git://git.drogon.net/wiringPi
	cd wiringPi
	./build
fi

if [ ! -d "$libdir/raspberry-remote" ]; then
	cd $libdir
	git clone git://github.com/xkonni/raspberry-remote.git
	cd raspberry-remote
	make send
fi


libdir="/var/lib/smarthome/usbpower"
sis_version="4.0"
if [ ! -d "$libdir/sispm/sispmctl-${sis_version}/" ]; then
	echo "Installing USB"
	mkdir -p $libdir/sispm
	apt-get install libusb-dev
	cd $libdir/sispm
	wget http://downloads.sourceforge.net/project/sispmctl/sispmctl/sispmctl-${sis_version}/sispmctl-${sis_version}.tar.gz
	tar xzvf sispmctl-${sis_version}.tar.gz
	cd sispm*
	./configure
	make
	sudo make install
fi
