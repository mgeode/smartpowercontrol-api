#!/usr/bin/env bash

path=$(find $(pwd) -type f -name "setupEnv.properties" -exec dirname {} \;)
source $path/setupEnv.properties
p="$path/../"

echo "Installing SPC-Node-Server"
echo "Return to continue"
read

mkdir -p $appdir
cp -Rvf ${p}lib ${appdir}/
cp -Rvf ${p}public ${appdir}/
cp -Rvf ${p}routes ${appdir}/
cp -Rvf ${p}views ${appdir}/
cp -Rvf ${p}*.js ${appdir}/
cp -Rvf ${p}*.json ${appdir}/
cp -Rvf ${p}bin/spcServer.init.sh /etc/init.d/spc_server
ln -s /etc/init.d/spc_server /usr/local/bin/
chmod a+x /etc/init.d/spc_server
cd $appdir
npm install

exit 0
