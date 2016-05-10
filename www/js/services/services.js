angular.module('starter.services', [])

  .factory('Sims', function ($cordovaFile) {
    // Might use a resource here that returns a JSON array

    var cordovaFile = $cordovaFile;

    var theLog = [{
      time: new Date,
      msg: "Init"
    }];

    var sims = [];

    // var sims1 = [{
    //   id: 54400001,
    //   type: 'normal',
    //   payedFrom: '15-3-2016',
    //   payedUntil: '15-3-2016'
    // }];

    var webSims = [{
      id: 54400001,
      type: 'normal',
      payedFrom: '15-5-2016',
      payedUntil: '15-6-2016'
    }, {
      id: 54400004,
      type: 'normal',
      payedFrom: '15-3-2016',
      payedUntil: '15-4-2016'
    }, {
      id: 54400005,
      type: 'normal',
      payedFrom: '15-3-2016',
      payedUntil: '15-4-2016'
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400007,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400008,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400009,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 544000016,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400005,
      type: 'normal',
      payedFrom: '15-3-2016',
      payedUntil: '15-4-2016'
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }, {
      id: 54400006,
      type: 'normal',
      payedFrom: '',
      payedUntil: ''
    }];

    var getLog = function () {
      return theLog;
    };

    var log = function (msg) {
      theLog.push({
        time: new Date,
        msg: msg
      })
    };

    var save = function (callback) {
      cordovaFile.checkFile(cordova.file.dataDirectory, "simsData.txt")
        .then(function (success) {
          saveFile(callback);
        }, function (error) {
          createFileAndSave(callback);
          log(error);
        });
    };

    var createFileAndSave = function (callback) {
      cordovaFile.createFile(cordova.file.dataDirectory, "simsData.txt", true)
        .then(function (success) {
          saveFile(callback);
        }, function (error) {
          callback("error creating new file");
          log("createFileAndSave failed");
          log(error);
        });
    };

    var saveFile = function (callback) {
      // sort the
      log("saveFile ");
      log("Len: " + sims.length);
      var simsTxt = JSON.stringify(sims);
      cordovaFile.writeFile(cordova.file.dataDirectory, "simsData.txt", simsTxt, true)
        .then(function (success) {
          callback("success saveing file");
        }, function (error) {
          callback("error saveing file");
          log(error);
        });
    };

    var fileFullPath = function () {
      var path = "";
      path += cordova.file.dataDirectory;
      path += "\simsData.txt";
      return path;
    };

    // Internal
    // Check if the file exist - if not first create the file
    // load the data json as a string
    // if fail returns null
    // if successful returns json as string
    var checkAndload = function (callback) {
      log("load bef file exist");
      // check if file exist
      cordovaFile.checkFile(cordova.file.dataDirectory, "simsData.txt")
        .then(function (success) {
          // success
          log("file exist");
          log(cordova.file.dataDirectory + "\\simsData.txt");
          loadFile(callback);
        }, function (error) {
          // File doesn't exist
          log(cordova.file.dataDirectory + "\\simsData.txt");
          log(error);
          createFile(function () {
            loadFile(callback);
          });
        });
    };

    // Internal
    // Create the storage data file
    var createFile = function (callback) {
      cordovaFile.createFile(cordova.file.dataDirectory, "simsData.txt", true)
        .then(function (success) {
          log("File created " + success);
          callback();
        }, function (error) {
          log("File not created " + error);
        });
    };

    // Internal
    // load the the data
    // Assume the file exist
    // Success - return json as string
    // fail - return null
    var loadFile = function (callback) {
      cordovaFile.readAsText(cordova.file.dataDirectory, "simsData.txt")
        .then(function (success) {
          callback(success);
        }, function (error) {
          callback(null);
          log("error loading file");
          log(error);
        });
    };

    var deleteSIM = function (simId, callback) {

      deleteSimFromDB(simId, function (result) {
        callback(result);
      });
    };

    var deleteSimFromDB = function (simId, callback) {
      var length = sims.length;
      var status = "failed";
      for (index = 0; index < length; index++) {
        if (simId == sims[index].id) {
          sims.splice(index, 1);
          status = "found";
          console.log("SIM deleted " + simId);
          break;
        }
      }
      if (status == "found") {
        if (window.cordova) {
          update(function (result) {
            console.log("delete saved " + simId);
            callback("deleted and saved");
            return;
          });
        }
        else {
          console.log("delete saved " + simId);
          callback("deleted and saved");
          return;
        }
      }
      callback("sim not found. delete failed");
      return;
    };

    var addSim = function (newSim, callback) {
      if (sims == null) {
        log("Err: addSim null");
        return;
      }
      sims.push(newSim);
      // Sort the array after adding the new item
      sims = _.sortBy(sims, 'id');

      if (window.cordova) {
        save(callback);

      }
      else {
        callback("non cordova save file ");
      }
    };

    // Interface
    // Load the SIMs from a file if on mobile or from array on browser
    // Returns an array of SIMs.
    var getSims = function (callback) {
      var start = new Date().getTime();
      if (window.cordova) {
        log("getSims - cordova");
        checkAndload(function (result) {
          if (result == null) {
            sims = {};
            log("getSims returned null");
            return;
          }
          else {
            log("getSims returned not null");
            try {
              sims = JSON.parse(result);
            } catch (e) {
              log("json parse ex:");
              sims = [];
            }
            log("getSims JSON parsed. arr:" + sims.length);
            var end = new Date().getTime();
            var diff = end - start;
            log("Time: " + diff);
            callback(sims);
            return;
          }
          return;
        });
      }
      else {
        log("getSims non cordova");
        setTimeout(function () {
          if (sims.length == 0) {
            sims = webSims;
          }
          callback(sims);
        }, 500);
      }
    };

    // Interface
    // Returns if SIM id found returns the SIM object else {} object
    var getSIM = function (simId) {
      var result = _.filter(sims, function (item) {
        return item.id == simId;
      });
      console.log("getSIM for " + simId + " is " + result.length);
      if (result.length > 0) {
        return result[0];
      }
      return null;
    };

    var resetFile = function (callback) {
      //sims = sims1.slice();
      log("resetFile");
      if (window.cordova) {
        save(function (result) {
          callback(result);
        });
      }
      else {
        callback(sims);
      }
    };

    // Save the entire array to the file
    var update = function (callback) {
      if (window.cordova) {
        save(function (result) {
          callback(results);
        });
      }
      else {
        setTimeout(function () {
          callback("dev mode");
        }, 1500);
      }
    };

    var updateSIM = function (sim, callback) {
      console.log("updateSIM " + JSON.stringify(sim));
      var length = sims.length;
      var status = "failed";
      console.log("sim id:" + sim.id + " len:" + length);
      for (i = 0; i < length; i++) {
        console.log("sims id:" + sims[i].id);
        if (sim.id == sims[i].id) {
          console.log("sim found id:" + sims[i].id);
          var theSim = sims[i];
          theSim.type = sim.type;
          theSim.payedFrom = sim.payedFrom;
          theSim.payedUntil = sim.payedUntil;
          status = "found";
          console.log("updateSIM found " + JSON.stringify(theSim));
          break;
        }
      }
      if (status == "found") {
        update(function (result) {
          console.log("update saved " + JSON.stringify(sim));
          callback("update saved");
          return;
        });
      }else {
        log("updateSIM error" + JSON.stringify(sim));
        console.log("updateSIM error" + JSON.stringify(sim));
        callback("update error");
      }
    };

    // Convert a Date object to a dd-mm-yyyy string
    var parseDateToString = function (dateObj) {
      console.log("parseDateToString " + typeof dateObj + " " + dateObj);
      if(dateObj == null || dateObj == ""){
        return "";
      }
      return dateObj.toDateString();
      // var dateStr = dateObj.getDate();
      // dateStr += "-";
      // dateStr += dateObj.getMonth() + 1;
      // dateStr += "-";
      // dateStr += dateObj.getFullYear();
      // return dateStr;
    };

    // Convert a date string of format: dd-mm-yyyy or dd.mm.yyyy or dd/mm/yyyy into a Date object
    var parseStringToDate = function (dateString) {
      if (dateString.length == 0) {
        return;
      }
      // var dateParts = dateString.split(" ");
      // if (dateParts.length < 4) {
      //   console.log('error parsing date' + dateString);
      //   log("error parsing date " + dateString);
      //   return "";
      // }
      var date = new Date(dateString);
      return date;
    };

    // Interface
    // If sims not already loaded - load the SIMS
    // Returns the number of SIMs
    var getNumberOfSIMs = function () {
      if (!sims) {
        log("getNumberOfSIMs n");
        getSims(function (sims) {
          console.log("getNumberOfSIMs loaded SIMs");
        });
      } else {
        log("getNumberOfSIMs");
      }
      return sims.length;
    };

    return {
      parseStringToDate: parseStringToDate,
      parseDateToString: parseDateToString,
      getSims: getSims,
      getSIM: getSIM,
      addSim: addSim,
      deleteSIM: deleteSIM,
      resetFile: resetFile,
      updateSIM: updateSIM,
      getNumberOfSIMs: getNumberOfSIMs,
      fileFullPath: fileFullPath,
      getLog: getLog,
      log: log
    };
  })
;
