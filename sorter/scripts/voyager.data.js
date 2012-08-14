(function () {

    // Входные данныые это массив из объектов(карточек),
    // объект должен иметь свойства c допустимыми значениями описанными ниже в примере:

    var testCardsArray = [
        {
            // Обязательные свойства
            from:'Moscow',      // откуда(любое кроме undefined)
            to:'Yekaterinburg', // куда(любое кроме undefined)
            trans:'aircraft',   // установленные значения: 'train', 'bus', 'aircraft', Но можно
                                // вводить любые(не будет уникальных строк)

            // Не обязательные свойства
            number:'94',        // номер транспорта (любое кроме undefined)

            extra:{             // дполнительные параметры (значение - это обьект со свойствами (key берется в строку
                gate:'C33',     // т. к. этот параметр неизвестен до исполнения программы))
                bagage:'section 2'
            },

            seat:'25', // пас. место (любое кроме undefined)
            more:'chartered flight' // любая дополнительная информация в виде предложения.
        },
        {
            from:'Rome',
            to:'Moscow',
            trans:'aircraft',
            number:'102',
            extra:{
                gate: '20'
            }
        },
        {
            from:'Yekaterinburg',
            to:'St. Petersburg',
            trans:'bus',
            number:'341',
            seat:'34',
            extra:{
                stops:'two'
            }
        },
        {
            from:'Paris',
            to:'Nice',
            trans:'train',
            number:'S33',
            more:"1 day on the road"
        },
        {
            from:'Monaco',
            to:'New York',
            trans:'aircraft',
            number:'345',
            seat:'D69'
        },
        {
            from:'Nice',
            to:'Monaco',
            trans:'bus',
            number:'21',
            seat:'13',
            extra:{
                tv:'yes'
            }
        },
        {
            from:'St. Petersburg',
            to:'Paris',
            trans:'aircraft',
            number:'342',
            seat:'193',
            more:'Bagage will be automaically transferred from your last leg'
        }];

    function shuffle(array) {
        for (var j, x, i = array.length; i; j = parseInt(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
        return array;
    }

    // json example for 'textarea' inert
    var stringsData = [
        '// Пример с одной карточкой\n',
        '[ {',
        '\t // Обязательные свойства',
        '\t "from":"Yekaterinburg", ',
        '\t "to":"St. Petersburg",',
        '\t "trans":"bus",',
        '\t // Не обязательные свойства',
        '\t "number":"341",',
        '\t "extra":{ "stops":"two", "tv": "yes" },',
        '\t "seat":"34",',
        '\t "more":"1 day on the road"',
        '}]'
    ].join('\n');

    window.voyagerData = {
        getCards:function () {
            return testCardsArray;
        },
        shuffle:function (array) {
            return shuffle(array);
        },
        getJson:function () {
            try {
                var string = mini('#jsonInput').value();
                var json = eval('(' + string + ')');
                return json;
            } catch (exception) {
                // nothing do
            }
        },
        setJsonTextarea:function () {
            mini('#jsonInput').value(stringsData)
        }
    }
})();








