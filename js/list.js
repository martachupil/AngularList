            var app = angular
                .module("listModule", ['LocalStorageModule'])
                .controller("listController", ['$scope', 'localStorageService', function ($scope, usersDataService,$window, $users) {
                    $scope.lists =
                        [
                            {
                                "name": "John Stark",
                                "number": "09533305",
                                "city": "Kiev",
                            },
                            {
                                "name": "Inga Tirel",
                                "number": "097773305",
                                "city": "Valiria",
                            },
                            {
                                "name": "Marta Targarien",
                                "number": "09883305",
                                "city": "Werteros",
                            },
                            {
                                "name": "Denis Lanister",
                                "number": "09883305",
                                "city": "Lviv",
                            }
                        ];
                    $scope.settings = {};
                    $scope.lists = $users;
                    $scope.addContact = function () {
                        if ($scope.name && $scope.number && $scope.city) {
                            $scope.lists.push({name: $scope.name, number: $scope.number, city: $scope.city});
                            $scope.name = "";
                            $scope.number = "";
                            $scope.city = "";
                        }
                    }

                }]);



            app.service('usersDataService', ['localStorageService', '$window', function($scope, localStorageService, $users) {

            var storage = [];
                $users.addItem($scope.name, $scope.number, $scope.city);
            this.getItem = function(itemId) {
                return (angular.isDefined(storage[itemId])) ? storage[itemId] : null;
            };

            this.exists = function(itemId) {
                return angular.isDefined(storage[itemId]);
            };

            function save() {
                localStorageService.set('items', JSON.stringify(storage));
            }

            }]);