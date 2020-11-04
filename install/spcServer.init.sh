#!/bin/bash

ARG1=$1
RUN_PORT=${RUN_PORT:-"5055"}
APPDIR="/opt/apps/spc/"
LOG="$APPDIR/spc.log"
APP="$APPDIR/index.js"
runurl="http://localhost:${RUN_PORT}"

function getDate () {
    date "+%Y-%m-%d %H:%M:%S"
}

function log() {
    content="$1";
    echo -e "$(getDate) - $content">>$LOG
}


function checkUrl(){
url=$1
if curl --output /dev/null --silent --head --fail "$url"; then
  printf '%s\n' "$(getDate) - $url exist">>$LOG
  return 0;
else
  printf '%s\n' "$(getDate) - $url does not exist"
  return 1;
fi
}

# START
function start() {
	cd $APPDIR
	node $APP 2>&1 >>$LOG &
}

# KILL/STOP
function stop() {
   pid=$(ps -ef | grep node | grep -v grep | awk '{print $2}');
   if [ "$pid" = "" ]; then
   	log "$0 is not running"
   else
   	log "Try to kill $pid"
      	kill -9 $pid
   fi
}

# Status
function status () {
	ps -ef | grep node | grep -v node
	ps -ef | grep node | grep -v $0
}

# USAGE
function usage () { 
	echo -e "Usage: $0 <start|stop|restart|status>" 
}

case $ARG1 in
	start)
		checkUrl $runurl
		if [ $? -gt 0 ];then
			log "Try to start $0"
			start
		else
			log "Can not start - $0 is already running"
		fi
	;;
	stop)
		checkUrl $runurl
		if [ $? -gt 0 ];then
			log "Can not stop - $0 is not running"
		else
			stop
		fi
	;;
	restart)
		stop
		start
	;;
	status)
		status
	;;
	*)
		usage
	;;
esac
