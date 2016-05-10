angular.module('starter')
  // Controller EditCtrl ----------------------------------------
  .controller('EditCtrl', function ($scope, $stateParams, Sims) {
    var sim = JSON.parse($stateParams.item);

    console.log(sim);
    $scope.sim = sim.id;
    $scope.prog = sim.type;
    $scope.payedFrom = {value: Sims.parseStringToDate(sim.payedFrom)};
    $scope.payedUntil = {value: Sims.parseStringToDate(sim.payedUntil)};

    $scope.save = function (sim, prog, payedFrom, payedUntil) {
      console.log("save: " + payedFrom);
      var newSim = {
        id: sim,
        type: prog,
        payedFrom: Sims.parseDateToString(payedFrom),
        payedUntil: Sims.parseDateToString(payedUntil)
      };
      console.log("save sim");
      console.log(new Date());
      Sims.updateSIM(newSim, function (result) {
        console.log("Save edited SIM " + result);
        $scope.isChanged = false;
        console.log(new Date());
        $scope.$apply();
      });
    };

    $scope.resetDates = function () {
      $scope.isChanged = false;
      $scope.payedFrom.value = "";
      $scope.payedUntil.value = "";
      $scope.isChanged = true;
      $scope.status = "";
    };

    $scope.isChanged = false;
    $scope.isFormDisabled = function () {
      return !$scope.isChanged;
    };

    $scope.textChanged = function () {
      $scope.isChanged = true;
    };

    $scope.deleteSIM = function (sim) {
      var simToDelete = sim;
      if (confirm("Are you sure you want to delete SIM " + $scope.sim) == true) {
        Sims.deleteSIM($scope.sim, function () {
          $scope.resetDates();
          $scope.sim = "";
          $scope.status = "SIM " + simToDelete + " was deleted";
        });
      } else {
        $scope.status = "Delete canceled";
      }
    };
  });
