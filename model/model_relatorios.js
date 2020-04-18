function readRelatorios(callback) {
    global.connect.con.query('SELECT nomeRelatorio, pdf, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador from relatorio', function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function saveRelatorio(nomeRelatorio, pdf, AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador, callback) {
    var linha = { nomeRelatorio: nomeRelatorio, pdf: pdf, AreaConhecimento_idAreaConhecimento: AreaConhecimento_idAreaConhecimento, Utilizador_idUtilizador: Utilizador_idUtilizador };
    var query = global.connect.con.query('INSERT INTO relatorio SET ?', linha, function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}

function setRelatorio(idRelatorio, nomeRelatorio, pdf, AreaConhecimento_idAreaConhecimento,Utilizador_idUtilizador, callback) {
    global.connect.con.query('UPDATE relatorio SET nomeRelatorio="'+ nomeRelatorio +'", pdf="'+ pdf +'", AreaConhecimento_idAreaConhecimento="'+nomeEvento+'", Utilizador_idUtilizador="'+ AreaConhecimento_idAreaConhecimento,Utilizador_idUtilizador +'" WHERE idRelatorio="'+ idRelatorio +'"',  function(err, rows, fields) {
        if (!err) {
            callback(null, rows);
        }
        else
            console.log('Error while performing Query.', err);
    });
};

function deleteRelatorio(idRelatorio, callback) {
   // var linha = { idRelatorio:idRelatorio };
    var query = global.connect.con.query('DELETE FROM relatorio WHERE idRelatorio = "'+ idRelatorio +'"',  function(err, rows, fields) {
        console.log(query.sql);
        if (!err) {
            console.log("Number of records inserted: " + rows.affectedRows);
        }
        else
            console.log('Error while performing Query.', err);
    });
}




module.exports = {
    readRelatorios: readRelatorios,
    deleteRelatorio: deleteRelatorio,
    setRelatorio: setRelatorio,
    saveRelatorio: saveRelatorio
    }