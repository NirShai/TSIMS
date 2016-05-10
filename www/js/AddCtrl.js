angular.module('starter')
  .controller('AddCtrl', function ($scope, $location, Sims) {
    var reset = function () {
      $scope.payed = true;
      $scope.sim = {value: ""};
      $scope.prog = {value: ""};
      $scope.status = "Total SIMS is: " + Sims.getNumberOfSIMs();
    };
    $scope.$on('$ionicView.enter', function () {
      reset();
    });

    $scope.reset = function () {
      reset();
    };

    $scope.info = function () {
      $scope.fullPath = Sims.fileFullPath;
      $scope.log = Sims.getLog();
    };

    $scope.deleteSims = function () {
      if (confirm("Are you sure you want to delete all SIMs?") == true) {
        Sims.resetFile(function () {
          $scope.statusx = "DB deleted";
        });
      } else {
        $scope.statusx = "Delete canceled";
      }
    };

    $scope.typeChanged = function (prog) {
      $scope.donkey = null;
      if (prog == 'donkey') {
        $scope.donkey = "true";
      }
    };

    // Save a new SIM
    $scope.save = function (sim, prog) {
      $scope.status = "saving new SIM";
      if (Sims.getSIM(sim) != null) {
        $scope.status = "SIM " + sim + "already exist!";
        return;
      }
      this.form.$invalid = true;
      var newSim = {
        id: sim,
        type: prog,
        payedFrom: "",
        payedUntil: ""
      };
      console.log('newSim: ' + JSON.stringify(newSim));

      Sims.addSim(newSim, function (result) {
        if (result.indexOf("error") > -1) {
          $scope.status = result;
        }
        else {
          $scope.status = "SIM " + sim + " was saved";
        }
      });
    };

    $scope.isFormDisabled = function () {
      return this.form.$invalid;
    };

  });

