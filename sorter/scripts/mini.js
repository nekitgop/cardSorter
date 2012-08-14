(function () {

    // constructor
    var mini = function (selector, item) {
        return new mini.proto.objectInit(selector, item);
    };

    mini.prototype = {

        constructor:mini,

        objectInit:function (selector, item) {

            if (!selector) {
                return this;
            }

            if (selector == document) {
                this[0] = document;
                this.length = 1;
                return this
            }

            // select tag body
            if (selector === "body" && document.body) {
                this[0] = document.body;
                this.length = 1;
                return this;

                // select by id
            } else if (selector.charAt(0) == '#') {
                selector = selector.replace(/#/, '');
                this[0] = document.getElementById(selector);
                this.length = 1;
                return this;

            // select by class
            } else if (selector.charAt(0) == '.') {
                selector = selector.replace(/./, '');
                if (item != undefined) {
                    this[0] = document.getElementsByClassName(selector)[item];
                    this.length = 1;
                } else {
                    this.length = document.getElementsByClassName(selector).length;
                    for (var i = 0; i < this.length; i++) {
                        this[i] = document.getElementsByClassName(selector)[i];
                    }
                }
                this.listeners = [];
                return this;
            }
        },

        splice:[].splice,

        innerHtml:function (val) {
            if (val) {
                this.forEach(function (index, el) {
                    el.innerHTML = val
                });
                return this;
            } else {
                var result = [];
                this.forEach(function (index, el) {
                    result.push(el.innerHTML)
                });
                return result;
            }
        },

        innerText:function (val) {
            if (val) {
                this.forEach(function (index, el) {
                    el.innerText = val
                });
                return this;
            } else {
                var result = [];
                this.forEach(function (index, el) {
                    result.push(el.innerText)
                });
                return result;
            }
        },

        insertElement:function (tagname, content, nameClass) {

            this.forEach(function (index, el) {
                var elem = document.createElement(tagname);
                elem.className = nameClass;
                if (!elem.innerText) {
                    elem.textContent = content;
                } else {

                    elem.innerText = content;
                }
                el.appendChild(elem);
            });

        },

        value:function (val) {
            var result = [];
            if (val) {
                this.forEach(function (index, el) {
                    result.push(el.value = val)
                });
            } else {
                this.forEach(function (index, el) {
                    result.push(el.value)
                });
            }

            return result.length > 1 ? result : result[0]

        },

        eventHandler:function (type, callback) {
            this[0].addEventListener(type, function (e) {
                callback(e);
            });
            return this
        },

        // add/ delete class
        class:function (todo, classname) {
            if (todo == "add") {
                this.forEach(function (index, el) {
                    if (el.className.match(/classname/)) {

                    } else {
                        el.className += (' ' + classname)

                    }
                });
            } else if (todo == "remove") {
                this.forEach(function (index, el) {
                    el.className = el.className.replace(classname, '')
                });
            }
            return this
        },

        // For each dom elements in this[..]
        forEach:function (callback) {
            if (this.length) {
                for (var i = 0; i < this.length; i++) {
                    callback(i, this[i])
                }
            }
        }
    };

    mini.proto = mini.prototype
    mini.proto.objectInit.prototype = mini.proto;
    window.mini = mini;

})();