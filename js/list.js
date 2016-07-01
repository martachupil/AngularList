            var app = angular
                .module("listModule", ['LocalStorageModule'])
                .controller("listController", ['$scope', 'localStorageService', function ($scope,localStorageService, $users) {
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
                        $users.addItem($scope.name, $scope.number, $scope.city);
                    }
                }])
                .config(function (localStorageServiceProvider) {
                    localStorageServiceProvider
                        .setPrefix('listModule')
                });

            app.service('usersDataService', [ 'localStorageService', '$window','$users', function(localStorageService,$users,$window)
            {
                var storage = [],
                    self    = this,
                    syncOn  = true;

                this.loaded = false;

                this.addItem = function(name, number, city) {
                    return storage.push({
                        'name': name,
                        'number': number,
                        'city': city
                    });

                    function save() {
                        localStorageService.set("lists", JSON.stringify($users));
                    }
                    function load() {
                        if (self.loaded) return true;
                        var lists = localStorageService.get('lists');
                        storage = [];
                        if (lists !== null) {
                            try {
                                storage = JSON.parse($users);
                                self.loaded = true;
                            } catch (McConaughey) {
                                console.error('Failed to fetch storage data', McConaughey);
                                self.loaded = false;
                                storage = [];
                            }
                        } else {
                            self.loaded = true;
                        }
                    }
                }

                if(!this.loaded) {
                    load();
                    $window.onbeforeunload = function(){
                        if(syncOn) {
                            save();
                        } else {
                            syncOn = true;
                        }
                    };
                }

                }]);

