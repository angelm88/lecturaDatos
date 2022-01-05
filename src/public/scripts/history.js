// De ser posible 
// procurar que el código de history.js se comunique con routes.js para acceder a la
// base de datos

// Preguntar acerca de https://codesandbox.io


$(document).ready(function () {
    $('body').on('click', '#searhHistory', searchFunction);
    $('body').on('change', '#period', onChangeSelect);
});

var onChangeSelect =  function (){
   var valor = $('#period').val();
   $('#containerEndDate').addClass('not-display');
    if (valor == '0')
    {
        $('#containerEndDate').removeClass('not-display');
    }
};

// var getCustomDateFormatted = function (date) {
//     let formatter = new Intl.DateTimeFormat('es-MX', { month: 'long' });
//     let newDate = new Date(date);
//     let day = newDate.getDate();
//     let month = newDate.getMonth() +1 ;
//     let year = newDate.getFullYear();

//     var minutos = newDate.getMinutes();
//     if (minutos < 10) {
//         minutos = '0' + minutos;
//     };

//     var horas = newDate.getHours();
//     if (horas < 10) {
//         horas = '0' + horas;
//     };

//     return `${year}-${month}-${day} ${horas}:${minutos}:00`;
// };

// function convertUTCDateToLocalDate(date) {
//     let date1 = new Date(date);
//     var newDate = new Date(date1.getTime() + date1.getTimezoneOffset() * 60 * 1000);
//     var offset = date1.getTimezoneOffset() / 60;
//     var hours = date1.getHours();
//     newDate.setHours(hours - offset);
//     return newDate;
// }

function searchFunction (){
    var params = {
        id_patient: $('#patient_id').val(),
        startdatetime: getCustomDateFormatted($('#start-date').val()),
        period: $('#period').val(),
        enddatetime: getCustomDateFormatted($('#end-date').val()),
    }
    $.ajax({
        url: 'http://localhost:5001/searhHistory',
        type: 'GET',
        data: params,
        error: function (e) { alert(e); },
        success: function (data) {
        var tableHistory = $('#tableHistoryData tbody');
        tableHistory.empty();
            $(data[0]).each(function () {
                var dateFinish = (new Date(this.date_time)).toLocaleString();
                tableHistory.append(
                    `<tr>
                        <td>${this.name}</td>
                        <td>${this.age}</td>
                        <td>${this.sex}</td>
                        <td>${this.spo2}</td>
                        <td>${this.heart_rate}</td>
                        <td>${dateFinish} </td>
                    </tr>`
                );
            });
        }
    });
}