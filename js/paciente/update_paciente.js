window.addEventListener('load', function () {


    //Buscamos y obtenemos el formulario donde estan
    //los datos que el usuario pudo haber modificado del paciente
    const formulario = document.querySelector('#update_paciente_form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        
        //creamos un JSON que tendrá los datos del paciente
        //a diferencia de un paciente nuevo en este caso enviamos el id
        //para poder identificarlo y modificarlo para no cargarlo como nuevo
        const formData = {
            id: document.querySelector('#paciente_id').value,
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            dni: document.querySelector('#dni').value,
            fechaIngreso: convertirFecha(document.querySelector("#fecha-ingreso").value),
            domicilio: {
                calle: document.querySelector('#calle').value,
                numero: document.querySelector('#numero').value,
                localidad: document.querySelector('#localidad').value,
                provincia: document.querySelector('#provincia').value
            }

        };

        //invocamos utilizando la función fetch la API pacientes con el método PUT que modificará
        //el paciente que enviaremos en formato JSON
        const url = URL_BASE + '/pacientes';
        const settings = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        }

        let notOk = false;
        fetch(url,settings)
        .then(res => {
                notOk = !res.ok;
            return res.json()
        })
        .then(data =>{
            if (notOk) {
                //Si hay algun error se muestra un mensaje diciendo que el odontologo
                //no se pudo guardar y se intente nuevamente

                Swal.fire("Maldición!", data, "error");
            }
            else{
                 //Si no hay ningun error se muestra un mensaje diciendo que el odontologo
                 //se agrego bien
                
                 Swal.fire(
                    "Correcto!",
                    "Ya actualizamos los datos de <strong>" + data.nombre + " " + data.apellido + "</strong>!",
                    "success"
                  ).then((result) => {
                    if (result.isConfirmed) {
                        location.reload()
                    }
                  })
                  
            }
        })

    })
 })

    //Es la funcion que se invoca cuando se hace click sobre el id de un paciente del listado
    //se encarga de llenar el formulario con los datos del paciente
    //que se desea modificar
    function findBy(id) {
          const url = URL_BASE + '/pacientes'+"/"+id;
          const settings = {
              method: 'GET'
          }
          fetch(url,settings)
          .then(response => response.json())
          .then(data => {
              let paciente = data;
              document.querySelector('#paciente_id').value = paciente.id;
              document.querySelector('#nombre').value = paciente.nombre;
              document.querySelector('#apellido').value = paciente.apellido;
              document.querySelector('#dni').value = paciente.dni;
             document.querySelector('#fecha-ingreso').value = desConvertirFecha(paciente.fechaIngreso);
              document.querySelector('#calle').value = paciente.domicilio.calle;
              document.querySelector('#numero').value = paciente.domicilio.numero;
              document.querySelector('#localidad').value = paciente.domicilio.localidad;
              document.querySelector('#provincia').value = paciente.domicilio.provincia;
              //el formulario por default esta oculto y al editar se habilita
              document.querySelector('#div_paciente_updating').style.display = "block";
          }).catch(error => {
              Swal.fire("Maldición!", error, "error");
          })
      }

      function convertirFecha(fecha) {
        return fecha.split("/").reverse().join("-");
      }

      function desConvertirFecha(fecha) {
        return fecha.split("-").reverse().join("/");
      }
