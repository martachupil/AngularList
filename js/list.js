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

                    }
                }])
                .config(function (localStorageServiceProvider) {
                    localStorageServiceProvider
                        .setPrefix('listModule')
                });

            app.service('usersDataService', 'localStorageService', '$window', function(localStorageService, $window)
            {
                var storage = [],
                    self    = this,
                    syncOn  = true;

                this.loaded = false;

                this.getItems = function(offset) {
                    return storage;
                };

                this.count = function() {
                    return storage.length;
                };

                this.addItem = function(name, number, city) {
                    return storage.push({
                        'name': name,
                        'number': number,
                        'city': city
                    });

                    function save() {
                        localStorageService.set("lists", JSON.stringify(storage));
                    }

                    function load() {
                        if (self.loaded) return true;
                        var lists = localStorageService.get('lists');
                        storage = [];
                        if (lists !== null) {
                            try {
                                storage = JSON.parse(lists);
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


                });

