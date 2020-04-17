$(document).ready(function () {
    getRelatorios();
    removeRelatorio();
});

function getRelatorios() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readRelatorios',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        

        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";
            
                txt += '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Título</th><th>pdf</th><th>Area de Conhecimento</th><th>Utilizador</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.nomeRelatorio + "</td><td>" + row.pdf + "</td><td>" + row.AreaConhecimento_idAreaConhecimento + "</td><td>" + row.Utilizador_idUtilizador + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_relatorios").html(txt);
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

$('#formNewRelatorio').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeRelatorio = $('#nome_relatorio').val();
        data.pdf = $('#pdf').val();;
        data.AreaConhecimento_idAreaConhecimento = 1;
        data.Utilizador_idUtilizador = 1;
    
        console.log(data);
       
       //$('#tabela_eventos')[0].reset();
    
        $.ajax({
            type: 'POST',
            url: '/saveRelatorio',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Relatório adicionado com sucesso");
                    $('#formNewRelatorio')[0].reset();
                }
                getRelatorios();
            },
        });
    }
});


$('#editar_relatorio').on('submit', function(e) {
   
    if (e.isDefaultPrevented()) {
        alert("O Relatório possui erros") 
    }
   
    else {
        event.preventDefault();
        var data = {};
        data.nomeEvento = $('#nome_relatorio').val();
        data.pdf = $('#real-file').val();
        data.AreaConhecimento_idAreaConhecimento = $('#').val();
        data.Utilizador_idUtilizador = $('#').val();
        

        console.log(data);
       
        $('#')[0].reset();
    
        $.ajax({
            type: 'PUT',
            url: '/setRelatorio',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Relatório editado com sucesso");
                }
            },
        });
    }
});

function removeRelatorio() {
    var data = {};
    
    data.idRelatorio = 4;
    console.log(data);

    $.ajax({
        type: 'DELETE',
        url: '/deleteRelatorio',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',
        
        success: function (data, status, request) {

            if (request.status == 200) {
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

$("#tabela_relatorios").on("click", "#elimarRelatorio", function() {
    $(this).closest("tr").remove();
 });