$(document).ready(function() {
    $('form').hide();

    $('header button').click(function(){
        $('form').slideToggle();
    });

    // Evento de clique na checkbox "Finalizada"
    $(document).on('click', '.task-checkbox', function() {
        if ($(this).is(':checked')) {
            $(this).closest('tr').addClass('finished'); 
            $(this).closest('tr').appendTo('table tbody'); 
            $(this).prop('disabled', true);
        }
    });

    $('#add-task').click(function(e) {
        e.preventDefault();

        const task = $('#task-desc').val();
        const stats = $('#task-status').val();
        const when = $('#when').val();
        const table = $('table tbody');

        if(!when || !task){
            alert("Verifique se a tarefa ou a data estão corretas!")
            return;
        }

        const dataFormatada = formatarData(when);

        let statusClass;
        if (stats === "Não iniciado") {
            statusClass = "nao-iniciado";
        } else if (stats === "Iniciado") {
            statusClass = "iniciado";
        } else if (stats === "Em andamento") {
            statusClass = "em-andamento";
        } else {
            statusClass = "";
        }

        const novaLinha = $('<tr>').append(
            $('<td>').text(task),
            $('<td>').text(stats),
            $('<td>').text(dataFormatada),
            $('<td>').append('<input type="checkbox" class="task-checkbox">')
        );

        novaLinha.addClass(statusClass);
        novaLinha.attr('data-date', when);

        table.append(novaLinha);

        verificaData();
    });

    function formatarData(when) {
        const partesData = when.split('-');
        const dia = partesData[2];
        const mes = partesData[1];
        const ano = partesData[0];
        return `${dia}/${mes}/${ano}`;
    }

    function verificaData(){
        let tbody = $('table tbody');
        let linhas = tbody.find('tr').get();

        linhas.sort(function(a, b){
            let dataA = new Date($(a).data('date'));
            let dataB = new Date($(b).data('date'));
            return dataB - dataA;
        });
        
        $.each(linhas, function(index,linha){
            tbody.append(linha);
        })
    }
    const entradaData = document.getElementById('when');
    const maxCaract = 10;

    entradaData.addEventListener('input', function(){
        if(this.value.length > maxCaract){
            this.value = this.value.slice(0, maxCaract)
        }
    });
});