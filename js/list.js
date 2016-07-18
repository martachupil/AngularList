            var app = angular
                .module("listModule", ['LocalStorageModule'])
                .controller("listController", ['$scope', 'usersDataService', function ($scope, usersDataService) {
                    $scope.lists = usersDataService.getData();
                    $scope.settings = {};



                    $scope.addContact = function () {
                        if ($scope.name && $scope.number && $scope.city) {
                            usersDataService.addItem({
                                name: $scope.name,
                                number: $scope.number,
                                city: $scope.city
                            });
                            $scope.name = "";
                            $scope.number = "";
                            $scope.city = "";
                        }
                    }

                }]);



            app.service('usersDataService', ['$window', function($window) {

                var items = [];

                this.addItem = function(item) {
                    items.push(item);
                };

                this.getData = function () {
                    return items;
                };

                function importFromLocalStorage() {
                  var data = $window.localStorage.getItem("addressBook");

                    if(data == null) {
                        items = [];
                    } else {
                        items = JSON.parse(data);
                    }
                }

                function saveToLocalStorage() {
                    $window.localStorage.setItem("addressBook", JSON.stringify(items) );
                }


                $window.onbeforeunload = function(event) {
                    saveToLocalStorage();
                };

                importFromLocalStorage();

            }]);