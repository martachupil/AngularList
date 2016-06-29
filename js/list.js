            var app = angular
                .module("listModule", ['LocalStorageModule'])
                .controller("listController", ['$scope',function ($scope) {

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
                    $scope.addContact = function () {
                        if ($scope.name && $scope.number && $scope.city) {
                            $scope.lists.push({name: $scope.name, number: $scope.number, city: $scope.city});
                            $scope.name = "";
                            $scope.number = "";
                            $scope.city = "";
                        }

                        var name = localStorageService.get('name');
                        var number = localStorageService.get('number');
                        var city = localStorageService.get('city');

                        localStorageService.set("name", JSON.stringify($scope.name));
                        localStorageService.set("number", JSON.stringify($scope.number));
                        localStorageService.set("city", JSON.stringify($scope.city));
                    }
                }])
                .config(function (localStorageServiceProvider) {
                    localStorageServiceProvider
                        .setPrefix('listModule')
                });

