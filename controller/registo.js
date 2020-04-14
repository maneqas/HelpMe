$(document).ready(function () {
    getUtilizador();
    getDadosUtilizador();
});

//Carregar o registo de um novo utilzador
('#formNewRegisto').validator().on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formul�rio com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.profissao = $('#profissao').val();
        data.ramo_emp = $('#ramoEp').val();
        data.num_trabalhadores = $('#nEmpregados').val();
        data.regiao_pais = $('#regiao').val();
        data.area_cientifica = $('#area').val();
        data.ciclo_estudo = $('#estudo').val();
        data.nome = $('#nome').val();
        data.idade = $('#idade').val();
        data.genero = $('#genero').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();
        data.perfil = 'Perfil p�blico';

        console.log(data);
        $('#formNewRegisto')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/saveUtilizador',
            data: data,
            success: function (result) {
                if (result.status == 200) {
                    alert("Bem Vindo � HeplMe Projects")
                    window.location.assign("/forum");
                }
                else {
                    alert("O seu Registo n�o foi efetuado, por favor tente outra vez");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(errorThrown);
                alert("erro");
            }
        });
    }
});

//Carregar dados para a p�gina gest�o de utilizadores
function getUtilizador() {
    var data = {};

    $.ajax({
        type: "GET",
        url: '/readUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',


        success: function (data, status, request) {
            console.log(data);
            if (request.status == 200) {
                var txt = "";

                txt += '<table class="table table-bordered" id="dataTable" width="100%" cellspacing="0" >';
                txt += "<thead>";
                txt += "<tr><th>Nome</th><th>Idade</th><th>G�nero</th><th>Profiss�o</th><th>Ramo Empresarial</th><th>N� Empregados</th><th>Regi�o do Pa�s</th><th>�rea de Conhecimento</th><th>Ciclo de Estudo</th><th>Email</th><th>Password</th><th>Descri��o</th></tr></thead><tbody>";

                data.forEach(function (row) {
                    txt += "<tr><td>" + row.nome + "</td><td>" + row.idade + "</td><td>" + row.genero + "</td><td>" + row.profissao +
                        "</td><td>" + row.ramo_emp + "</td><td>" + row.num_trabalhadores + "</td><td>" + row.regiao_pais + "</td><td>" + row.area_cientifica +
                        "</td><td>" + row.ciclo_estudo + "</td><td>" + row.email + "</td><td>" + row.password + "</td><td>" + row.descricao + "</td></tr>";

                });
                txt += "</tbody></table>";

                $("#tabela_utilizador").html(txt);
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

//Quando selecionar o utilizador carregar os dados para o modal editar
function getDadosUtilizador() {
    var data = {};
    data.idUtilizador = 1;

    $.ajax({
        type: 'GET',
        url: '/readUtilizador',
        data: JSON.stringify(data),
        contentType: 'application/json; charset=utf-8',

        success: function (data, status, request) {

            if (request.status == 200) {
                $('#profissao').val(data[0].profissao);
                $('#ramoEp').val(data[0].ramo_emp);
                $('#nEmpregados').val(data[0].num_trabalhadores);
                $('#regiao').val(data[0].regiao_pais);
                $('#area').val(data[0].area_cientifica);
                $('#estudo').val(data[0].ciclo_estudo);
                $('#nome').val(data[0].nome);
                $('#idade').val(data[0].idade);
                $('#genero').val(data[0].genero);
                $('#email').val(data[0].email);
                $('#password').val(data[0].password);
                $('#descricao').val(data[0].descricao);
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

//Editar utilzador
('#formEditarUtilizador').validator().on('submit', function (e) {

    if (e.isDefaultPrevented()) {
        alert("Formul�rio com erros")
    }
    else {
        event.preventDefault();

        var data = {};
        data.profissao = $('#profissao').val();
        data.ramo_emp = $('#ramoEp').val();
        data.num_trabalhadores = $('#nEmpregados').val();
        data.regiao_pais = $('#regiao').val();
        data.area_cientifica = $('#area').val();
        data.ciclo_estudo = $('#estudo').val();
        data.nome = $('#nome').val();
        data.idade = $('#idade').val();
        data.genero = $('#genero').val();
        data.email = $('#email').val();
        data.password = $('#password').val();
        data.descricao = $('#descricao').val();
        //data.perfil = 'Perfil p�blico';

        console.log(data);
        $('#formEditarUtilizador')[0].reset();

        $.ajax({
            type: 'POST',
            url: '/saveUtilizador',
            data: data,
            success: function (result) {
                if (result.status == 200) {
                    alert("Editado com sucesso")
                    getUtilizador();
                    window.location.assign("/admin");
                }
                else {
                    alert("N�o foi editado com sucesso");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(xhr.responseText);
                console.log(textStatus);
                console.log(errorThrown);
                alert("erro");
            }
        });
    }
});