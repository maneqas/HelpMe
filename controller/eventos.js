$(document).ready(function () {
    getEventos();
    //getDadosEvento();

});

function getEventos() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readEventos',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
                txt += '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Nome</th><th>Area de Conhecimento</th><th>Tipo</th><th>Utilizador</th><th>Data de Ínicio</th><th>Data de Fim</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.nomeEvento + "</td><td>" + row.AreaConhecimento_idAreaConhecimento + "</td><td>" + row.tipoEvento + "</td> <td>" + row.Utilizador_idUtilizador + "</td><td>" + row.data_inicio + "</td><td>" + row.data_fim + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_eventos").html(txt);
            }
            else {
                console.log("Erro");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);

        }

    });

};


$('#formNewEvento').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Evento possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeEvento = $('#nomeEvento').val();
        data.AreaConhecimento_idAreaConhecimento = 2;
        data.tipoEvento = $('#tipoEvento').val();
        data.Utilizador_idUtilizador = 2;
        data.data_inicio = $('#inicioEvento').val();
        data.data_fim = $('#fimEvento').val();

        console.log(data);
       
        $("#formNewEvento")[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/saveEvento',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Evento adicionado com sucesso");
                }
                getEventos();
            },
            
        });
    }
});

//Quando selecionar o utilizador carregar os dados para o modal editar
function getDadosEvento() {
    var data = {}

    $.ajax({
        type: 'GET',
        url: '/readEventos',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
                $('#nomeEvento_edi').val(teste.nomeEvento);
                $('#tipoEvento_edi').val(teste.tipoEvento);
               // $('#AreaConhecimento_idAreaConhecimento').val(data[1].AreaConhecimento_idAreaConhecimento);
                //$('#Utilizador_idUtilizador').val(data[1].Utilizador_idUtilizador);
                $('#inicioEvento_edi').val(teste.data_inicio);
                $('#fimEvento_edi').val(teste.data_fim);
               

             console.log(data)
             
            }
            else {
                console.log("Erro");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};




$('#editar_evento').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Evento possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        //data.idEvento = ;
        data.nomeEvento = $('#nomeEvento_edi').val();
        data.AreaConhecimento_idAreaConhecimento = 2;
        data.tipoEvento = $('#tipoEvento_edi').val();
        data.Utilizador_idUtilizador = 2;
        data.data_inicio = $('#inicioEvento_edi').val();
        data.data_fim = $('#fimEvento_edi').val();
        

        console.log(data);
       
        //$('#')[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/setEvento',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Evento editado com sucesso");
                }
                getEventos();
            },
           
        });
    }
});


function removeEvento() {
    var data = {};
    data.nomeEvento = teste.nomeEvento;
    console.log(data);

    $.ajax({
        type: 'DELETE',
        url: '/deleteEvento',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
                
            }
            else {
                console.log("Erro");
            }
            getEventos();
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);
            alert("erro");
        }
    });
};


/*
$("#tabela_eventos").on("click", "#eliminar_evento", function() {
    $(this).closest("tr").remove();
 });
*/


 $("#eliminar_evento").on("click", function() {
    removeEvento();
 });


 var teste = {}
 $('#tabela_eventos').on('click', 'tr', function() {
     //get row contents into an array
     var tableData = $(this).children("td").map(function() {
         return $(this).text();
     }).get();

     getDadosEvento();
     
        
     teste.nomeEvento = tableData[0]
     teste.tipoEvento = tableData[2]
     teste.data_inicio= tableData[4]
     teste.data_fim = tableData[5]
     //console.log(data)
 });

