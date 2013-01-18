(function () {
    // onload init call
    window.addEventListener("load", function () {
        init()
    });

    // Функция инициализации
    function init() {

        mini('.outStrings').eventHandler("click", function () {

            if(voyagerData.getJson()){
                outputAction(voyagerData.getJson())
            } else {
                outputAction(voyagerData.getCards())
            }
        });

        mini('.submit').eventHandler("click", function () {
            voyagerData.setJsonTextarea();
        });

        mini('.clear').eventHandler("click", function(){
            mini('#jsonInput').value(' ')
        });
    }

    function outputAction(data) {

        // sort() - создает эксемпляр класса для работы с данными
        // Данные (в виде массива карт) для обработки нужно передать функции вместо 'data'
        var resultStrings = sort(data).getStrings();

        var output = mini('.output');
        output.innerHtml(' ');

        for (var j = 0; j < resultStrings.length; j++) {
            output.insertElement('div', resultStrings[j], 'elem')

        }
    }


})();




