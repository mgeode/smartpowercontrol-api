'use strict';


/*
 * VARIABLES
 */
var listIndexLong = [];// {0:"00",1:"01",2:"02",3:"03",4:"04",5:"05",6:"06",7:"07",8:"08",9:"09",10:"10",11:"11",12:"12"};
var listDayIndexLong = {
    0: "00",
    1: "01",
    2: "02",
    3: "03",
    4: "04",
    5: "05",
    6: "06",
    7: "07",
    8: "08",
    9: "09",
    10: "10",
    11: "11",
    12: "12",
    13: "13",
    14: "14",
    15: "15",
    16: "16",
    17: "17",
    18: "18",
    19: "19",
    20: "20",
    21: "21",
    22: "22",
    23: "23",
    24: "24",
    25: "25",
    26: "26",
    27: "27",
    28: "28",
    29: "29",
    30: "30",
    31: "31"
};
var listMonthNames = {
    1: "Januar",
    2: "Februar",
    3: "Maerz",
    4: "April",
    5: "Mai",
    6: "Juni",
    7: "Juli",
    8: "August",
    9: "September",
    10: "Oktober",
    11: "November",
    12: "Dezember"
};
var i = 0;
while (i <= 60) {
    var intVal = 100 + i;
    var strVal = "" + intVal;
    var strOut = strVal.substr(1);
    listIndexLong[i] = strOut;
    i++;
}



/**
 * getTimeStamp
 * @param isName
 * @returns {string}
 */
exports.getTimeStamp=function(isName) {
    var date = new Date();
    var listIndex=listIndexLong;
    if (isName)
        listIndex=listMonthNames;

    var dayIndex = date.getDate();
    var day=listIndexLong[dayIndex];
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var seconds = date.getSeconds();
    var minutes = date.getMinutes();
    var hours = date.getHours();

    return year+"-"+listIndex[monthIndex]+"-"+day+" "+hours+":"+minutes+":"+seconds;
}

/**
 * getDate
 * @param isYear
 * @returns {string}
 */
exports.getDate=function(isYear) {
    var date = new Date();
    var day=listIndexLong[date.getDate()];
    var month = listIndexLong[date.getMonth()+1];
    var year = date.getFullYear();

    if (isYear)
        return year+"-"+month+"-"+day;

    return month+"-"+day;
}
exports.getDateFormated=function(){
    var date = new Date();
    var day=listIndexLong[date.getDate()];
    var month = listIndexLong[date.getMonth()+1];
    var year = date.getFullYear();

    return day+"."+month+"."+year;
}
/**
 * getTime
 * @param isSeconds
 * @returns {string}
 */
exports.getTime=function(isSeconds) {
    var date = new Date();
    var hours = listIndexLong[date.getHours()];
    var minutes = listIndexLong[date.getMinutes()];
    var seconds = listIndexLong[date.getSeconds()];

    if (isSeconds)
        return hours+":"+minutes+":"+seconds;

    return hours+":"+minutes;
}

