(function () {

    function sort(array) {
        var newArray = [];
        newArray.push(array[0]);
        array.splice(0,1);
            do {
                for (var j = 0; j < array.length; j++) {
                    if (newArray[0].from == array[j].to) {
                        newArray.unshift(array.splice(j, 1)[0]);
//                        j--
                    } else if (newArray[newArray.length - 1].to == array[j].from) {
                        newArray.push(array.splice(j, 1)[0]);
//                        j--
                    }
                }
            }  while (array.length > 0);
        for (var s = 0; s < newArray.length; s++) {
            console.log((s+1) +' ' + newArray[s].from + ' ->> ' + newArray[s].to)
        }
        return newArray
    }

    /*function sort(array) {

     var resultArrayArrays = [];

     for (var s = 0; s < array.length; s++) {
     // для рекурсии
     resultArrayArrays[s] = new Array();
     resultArrayArrays[s].push(array[0]);
     for (var j = 1; j < array.length - 1; j++) {
     if (array[0][0] instanceof Array){
     for (var z = 0; z< array.length; z++){
     var newArray = [];
     //                            console.log(array[z][0]);
     //                            console.log(array[z][1]);
     //                            console.log(array[z][2]);
     //                            console.log(array[z][3]);
     for(var l = 0; l < array[z].length ; l++ ){
     for(var x = 0; x < array[z][l].length ; x++ ){

     newArray.push(array[z][x]); //  array with objects  //.push(array[z][l])
     }
     }
     array[z] = newArray
     }
     }
     if (array[0] instanceof Array) {
     if (array[0][0].from == array[j][array[j].length-1].to) {
     resultArrayArrays[s].unshift(array.splice(j, 1)[0]);
     }
     if (array[0][array[0].length-1].to == array[j][0].from) {
     resultArrayArrays[s].push(array.splice(j, 1)[0]);
     }
     } else {
     if (array[0].from == array[j].to) {
     resultArrayArrays[s].unshift(array.splice(j, 1)[0]);
     }
     if (array[0].to == array[j].from) {
     resultArrayArrays[s].push(array.splice(j, 1)[0]);
     }
     }
     }
     array.splice(0, 1);
     console.log('остаток из 2-х: ' + array.length);
     console.log(resultArrayArrays[s]);
     }
     // досылаем остаток ( норм без рекурсии)
     // если уже массивы то достать остаток массив
     for(var v = 0; v < array.length; v++ ) {
     resultArrayArrays.push(new Array(array[v]))
     }
     console.log(resultArrayArrays[resultArrayArrays.length -1 ]);
     console.log(resultArrayArrays[resultArrayArrays.length -2 ]);

     if(gf< 2){
     gf++;
     console.log('recurse '+ gf);
     sort(resultArrayArrays); // отдаем массив массивов обьектов, а надо массив обьектов TODO: подумать
     }
     }*/

    window.voyagerSort = {
        sorter:function (array) {
            return sort(array);
        }
    };
})();






