window.addEventListener('load', function () {
    (function(){

      //con fetch invocamos a la API de turnos con el método GET
      //nos devolverá un JSON con una colección de turnos
      const url = URL_BASE + '/turnos';
      const settings = {
        method: 'GET'
      }

      fetch(url,settings)
      .then(response => response.json())
      .then(data => {
      //recorremos la colección de turnos del JSON
         for(turno of data){
            //por cada turno armaremos una fila de la tabla
            //cada fila tendrá un id que luego nos permitirá borrar la fila si eliminamos el turno
            var table = document.getElementById("turnoTable");
            var turnoRow =table.insertRow();
            let tr_id = 'tr_' + turno.id;
            turnoRow.id = tr_id;

            //por cada turno creamos un boton delete que agregaremos en cada fila para poder eliminarlo
            //dicho boton invocara a la funcion de java script deleteByKey que se encargará
            //de llamar a la API para eliminar un turno
            let deleteButton = '<button' +
                                      ' id=' + '\"' + 'btn_delete_' + turno.id + '\"' +
                                      ' type="button" onclick="deleteBy('+turno.id+')" class="btn btn-danger btn_delete">' +
                                      '&times' +
                                      '</button>';

            //por cada turno creamos un boton que muestra el id y que al hacerle clic invocará
            //a la función de java script findBy que se encargará de buscar el turno que queremos
            //modificar y mostrar los datos del mismo en un formulario.
            let updateButton = '<button' +
                                      ' id=' + '\"' + 'btn_id_' + turno.id + '\"' +
                                      ' type="button" onclick="findBy('+turno.id+')" class="btn btn-info btn_id">' +
                                      turno.id +
                                      '</button>';

            //armamos cada columna de la fila
            //como primer columna pondremos el boton modificar
            //luego los datos del turno
            //como ultima columna el boton eliminar
            let strPaciente = turno.paciente.nombre.toUpperCase() + " " + turno.paciente.apellido.toUpperCase() + " (" + turno.paciente.id + ")"
            let strOdontologo = turno.odontologo.nombre.toUpperCase() + " " + turno.odontologo.apellido.toUpperCase() + " (" + turno.odontologo.id + ")"

            turnoRow.innerHTML = '<td>' + updateButton + '</td>' +
                    '<td class=\"td_paciente\">' + strPaciente + '</td>' +
                    '<td class=\"td_odontologo\">' + strOdontologo + '</td>' +
                    '<td class=\"td_fecha\">' + convertirFecha(turno.fechaHora) + '</td>' +
                    '<td>' + deleteButton + '</td>';

        };
        document.getElementById("loading").style.display = "none";
        })
   
  })

    (function(){
      let pathname = window.location.pathname;
      if (pathname == "/turno-lista.html") {
          document.querySelector(".nav .nav-item a:last").addClass("active");
      }
    })

    function convertirFecha(fecha) {
      let opciones = {year:"numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute:"2-digit", hour12:false}
      return new Date(fecha).toLocaleString('es-AR', opciones);
    }


    })