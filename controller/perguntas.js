$(document).ready(function() {
    getPerguntasInicio()
});

function getPerguntasInicio() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readPerguntas',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(data, status, request) {
            if (request.status == 200) {
                var txt = "";
                data.forEach(function(row) {
                    txt += "<div class='panel panel-default'>";
                    txt += "<div class='panel-heading' role='tab' id='pIntegracao' style='background-color:white'>";
                    txt += "<h4 style='font-size: 15px'>";
                    if (row.idUser != null) {
                        txt += "<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"pages('perg_resp'); seePergunta(" + row.idPergunta + ")\">"
                    } else {
                        txt += "<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"alert('Precisas fazer login para ter acesso às perguntas completas')\">"
                    }
                    //txt+="<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"seePergunta("+row.idPergunta+")\">"
                    //txt+="<a class='panel-title-child' role='button' data-toggle='collapse' data-parent='#accordion' aria-expanded='true' aria-controls='collapseOne' onclick=\"alert('Precisas fazer login para ter acesso às perguntas completas')\">"
                    txt += row.titulo_pergunta + "</a></h4><p>" + row.pergunta + "</p></div></div>";
                });

                $("#perguntas_forum").html(txt);
            } else {
                console.log("Erro");
            }
        },
        error: function(xhr, textStatus, errorThrown) {
            console.log(xhr.responseText);
            console.log(textStatus);
            console.log(errorThrown);

        }

    });

};

function pages(page) {

    load_home("about", page);

    function getEventTarget(e) {
        e = e || window.event;
        return e.target || e.srcElement;
    }

    function load_home(var1, var2) {
        $.ajax({
            type: "GET",
            url: "./pages/" + var2 + ".html",
            data: {},
            success: function(data) {
                $("#" + var1).html(data);
            },
            error: function(data, err, err2) {
                console.log(data);
                console.log(err);
                console.log(err2);
                console.log(err2);
            }
        });
        var body = document.body;
        var html = document.documentElement;
    }
    $("#accordionSidebar").children("li").on('click', function() {
        var targetID = $(this).children('a').attr('id');
        //alert(targetID);
        load_home("content-wrapper", targetID);
    });
};

function seePergunta(id) {

    var data = {};
    data.idPergunta = $(id);
    var data2 = {};
    data2.idPergunta = $(id);

    $.ajax({
        type: "POST",
        url: '/getPergunta',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function(result, data) {

            var txt = "";
            result.forEach(function(row) {
                txt += "<h2>" + row.titulo_pergunta + "</h2><p style=\"margin-top:2px\">";
                txt += "<strong>" + row.nome + "</strong>";
                txt += "<p style=\"border-bottom: 1px solid #515769;\">" + row.pergunta + "</p>";

                $.ajax({
                    type: "POST",
                    url: '/getResposta',
                    data: JSON.stringify(data2),
                    contentType: 'application/json; charset=utf-8',

                    success: function(result, data) {

                        var resp = "";
                        result.forEach(function(row) {
                            resp += "<div style=\"border-bottom: 1px solid #515769;\"><p><strong>" + row.nome + "</strong><br><p>" + row.resposta + "</p></div>";
                        });
                        $("#resposta").html(resp);
                    },
                    error: function(data) {
                        console.log(data)
                    }
                });
            });
            //document.getElementById('#pergunta').appendChild(txt);
            $("#pergunta").html(txt);

        },
        error: function(data) {
            console.log(data)
        }
    });
};

$('#formNewPergunta').on('submit', function(e) {

    if (e.isDefaultPrevented()) {
        alert("A Questão possui erros")
    } else {
        event.preventDefault();
        var data = {};
        data.titulo_pergunta = $('#tit_pergunta').val();
        data.pergunta = $('#descricao').val();
        data.data_pergunta = null;
        data.lingua = "PT";
        data.num_likes = 0;
        data.AreaConhecimento_idAreaConhecimento = 3;
        data.Utilizador_idUtilizador = 2;

        console.log(data);

        $("#formNewPergunta")[0].reset();

        $.ajax({
            type: 'POST',
            url: '/savePergunta',
            data: JSON.stringify(data),
            contentType: 'application/json',
            success: function(result) {
                if (result.status == 200) {
                    alert("Pergunta adicionada com sucesso");
                }
                getPerguntas();
            },

        });
    }
});