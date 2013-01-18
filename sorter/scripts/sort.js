(function () {

    var sort = function (array) {
        return new Sort(array)
    };

    function Sort(cards) {
        this.cards = cards
    }

    Sort.prototype = {

        constructor:Sort(),

        // Working sorter
        sorter:function () {
            var array = this.cards.slice();
            var newArray = [];
            newArray.push(array[0]);
            array.splice(0, 1);
            do {
                for (var j = 0; j < array.length; j++) {
                    if (newArray[0].from == array[j].to) {
                        newArray.unshift(array.splice(j, 1)[0]);
                    } else if (newArray[newArray.length - 1].to == array[j].from) {
                        newArray.push(array.splice(j, 1)[0]);
                    }
                }
            } while (array.length > 0);

            return newArray
        },

        // Sorter with bugs, but may be more interesting (should give a great speed but fails if the
        // input array longer than 7(bad implementation))
        sorterNew:function () {
            var array = this.cards.slice();
            for (var s = 0; s < array.length; s++) {
                array[s] = [array[s]]
            }
            var result;
            recurse(array);

            function recurse(array) {
                for (var globalCount = 0; globalCount < array.length; globalCount++) {
                    for (var i = globalCount + 1; i < array.length; i++) {
                        if (array[globalCount][0].from == array[i][array[i].length - 1].to) {
                            for (var j = array[i].length - 1; j == 0; j--) {
                                array[globalCount].unshift(array[i][j]);
                            }
                            array.splice(i, 1)
                        } else if (array[globalCount][array[globalCount].length - 1].to == array[i][0].from) {
                            for (var s = 0; s < array[i].length; s++) {
                                array[globalCount].push(array[i][s]);
                            }
                            array.splice(i, 1)
                        }
                    }
                }
                if (array.length < 2) {
                    result = array[0];
                    return true
                }
                recurse(array)
            }

            return result
        },

        getStrings:function () {
            var sortedCards = this.sorter(this.cards);

            // Unique strings for each known transport type names
            var str = {
                "aircraft":" take flight",
                "train":"Take train",
                "bus":" bus number "
            };

            function buildScheme(info, infoPrep/* info about previous point */, infoFollow /* info about follow point */) {
                // Transport schemes, depending on 'trans' type
                var schemes = {
                    defaultScheme:[
                        "From" ,
                        info.from ,
                        (str[info.trans] || 'take ' + info.trans) ,
                        (info.number || '') ,
                        'to' ,
                        info.to + "."].join(' '),
                    aircraft:[
                        "From" ,
                        info.from ,
                        (str[info.trans] || info.trans) ,
                        (info.number || '') ,
                        'to' ,
                        info.to + "."].join(' '),
                    train:[
                        (str[info.trans] || info.trans),
                        (info.number || '') ,
                        " from " ,
                        info.from ,
                        'to' ,
                        info.to + "."].join(' '),
                    bus:[
                        "Take",
                        infoFollow && infoFollow.trans == "aircraft" ? "airport" : "" ,
                        (str[info.trans] || info.trans),
                        (info.number || '') ,
                        " from " ,
                        info.from  ,
                        'to' ,
                        info.to + "."].join(' ')
                };

                // Complete all response string with more info
                var content = {
                    main:schemes[info.trans] || schemes.defaultScheme,
                    seat:info.seat ? " Seat " + info.seat : 'No seat assignment',
                    details:(function (extra) {
                        var cnt = 0;
                        for (var prop in extra) cnt++
                        if (extra && cnt > 0) {
                            var result = '';
                            for (var data in extra) {
                                result += '. ' + firstUp(data) + ': ' + extra[data];
                            }
                            return result
                        } else {
                            return ""
                        }
                    })(info.extra),
                    more:". " + (info.more || '' )

                };

                function firstUp(str) {
                    return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
                }

                return content.main + content.seat + content.details + content.more;
            }

            if (!(sortedCards instanceof Array)) {
                throw new Error('type of sorted cards should be array..');
                return false
            }
            var routes = [];

            for (var i = 0; i < sortedCards.length; i++) {
                routes.push(buildScheme(sortedCards[i], sortedCards[i - 1], sortedCards[i + 1]));
            }
            return routes;
        }
    };

    window.sort = sort
})();
