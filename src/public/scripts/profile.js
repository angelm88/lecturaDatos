const socket = io.connect('localhost:5001', {'forcenew':true});

//this code listens the server and handles the received data/messages from it
socket.on('from_server', data => {
    console.log(data);
    for(let index = 0; index < data.spo2.length; index++){
        document.getElementById(`patient_${index+1}_spo2`).innerHTML = data.spo2[index];
        document.getElementById(`patient_${index+1}_hr`).innerHTML = data.hr[index];
    }
});

$(document).ready(function () {
$('body').on('click', '#modal-new-patient', openModalTest);
});

function openModalTest (){
    $('#onload').modal('show');
}

function add_patient(){
    var params = {
        medical_license: 5, 
        name: $('#name').val(),
        last_name: $('#last_name').val(),
        sex: $('#sex').val(),
        age: $('#age').val(),
    }
    $.ajax({
        url: 'http://localhost:5001/add_patient',
        type: 'POST',
        data: params,
        error: function (e) { alert(e); },
        success: function (data) {
            window.location.reload();
        }
    });
}

function remove_patient(){

}

function newPopup(url) {
    popupWindow = window.open(
        url,'popUpWindow','height=576,width=576,left=10,top=10,resizable=yes,scrollbars=yes,toolbar=yes,menubar=no,location=no,directories=no,status=yes');
}
