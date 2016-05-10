angular.module('starter')
  // Controller SIMsCtrl ----------------------------------------
  .controller('SIMsCtrl', function ($scope, Sims) {
    $scope.searcher = {value: ""};
    $scope.sims = [];

    var loadData = function () {
      Sims.getSims(function (results) {
        // display a clone of the array
        if (Object.prototype.toString.call(results) === '[object Array]') {
          var i;
          $scope.sims.length = 0;
          for (i = 0; i < results.length; i++) {
            $scope.sims.push({
              id: results[i].id,
              type: results[i].type,
              payedFrom: results[i].payedFrom,
              payedUntil: results[i].payedUntil
            });
          }
          $scope.len = $scope.sims.length;
          $scope.$apply();
        } else {
          that.sims = {};
        }
      });
    };

    ionic.Platform.ready(function () {
      $scope.$on('$ionicView.enter', function () {
        // Sims.log("platform ready");
        loadData();
      });
      loadData();
    });
    $scope.pay = function (id, index) {
      var sim = $scope.sims[index];
      if (sim.id == id) {
        var payedFrom = new Date();
        var payedUntil = new Date();
        payedUntil.setMonth(payedFrom.getMonth() + 1);
        sim.payedFrom = payedFrom.toDateString();
        sim.payedUntil = payedUntil.toDateString();
        console.log("pay: " + sim.payedUntil);
        Sims.updateSIM(sim, function (results) {
          console.log("pay sim updated");
        });
      } else {
        alert('error: ' + sim.id + ' sim not found');
      }
    };

    $scope.filter = function (mode) {
      switch (mode) {
        case 1:
          $scope.sims = _.filter($scope.sims, function (item) {
            return item.mode == -3;
          });
          break;
        case 2:
          $scope.sims = _.filter($scope.sims, function (item) {
            return item.mode == 1;
          });
          break;
        case 3:
          $scope.sims = _.filter($scope.sims, function (item) {
            return item.mode == -2;
          });
          break;
        default:
          loadData();
      }
    };

    var filterState = false;
    $scope.textChanged = function () {
      //Filter only if key is longer than 2 chars
      if ($scope.searcher.value.length > 2) {
        filterState = true;
        $scope.sims = _.filter($scope.sims, function (item) {
          return item.id.toString().indexOf($scope.searcher.value) > -1;
        });
      }
      else if (filterState == true) {
        // if filter is on and key is being shorten to less than 2 reload the array
        // Sims.log("filterstate");
        filterState = false;
        loadData();
      }
    };

    $scope.clearSearch = function () {
      $scope.searcher.value = "";
      loadData();
    };

    // $scope.load = function () {
    //   loadData();
    // };

    // Change the state from expired to "payable"
    $scope.makePayable = function (id, index) {
      // Sims.log("make payable");
      var sim = $scope.sims[index];
      if (sim.id == id) {
        sim.payedFrom = "";
        sim.payedUntil = "";
        Sims.updateSIM(sim, function (results) {
          //console.log("sim updated");
        });
      } else {
        alert('error: ' + sim.id + ' sim not found');
      }
    };
    // if not expired - 1 red
    // if available - 2 orange
    // if payed - 3 green
    $scope.chooseOption = function (item) {
      var dateStr = item.payedUntil;
      // Sims.log("choose op");
      var dateObj = Sims.parseStringToDate(dateStr);
      if (dateObj == null || dateObj == '') {
        item.mode = -2;
        return -2; // not payed
      }
      var now = new Date;
      var days = (now - dateObj) / 1000 / 60 / 60 / 24;
      if (now > dateObj) {
        item.mode = 1;
        return 1; // expired
      }
      item.mode = -3;
      return -3; // payed and not expired
    };
  });


