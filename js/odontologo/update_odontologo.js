window.addEventListener('load', function () {


    //Buscamos y obtenemos el formulario donde estan
    //los datos que el usuario pudo haber modificado del odontologo
    const formulario = document.querySelector('#update_odontologo_form');

    formulario.addEventListener('submit', function (event) {
        event.preventDefault();

        //creamos un JSON que tendrá los datos del odontologo
        //a diferencia de un odontologo nuevo en este caso enviamos el id
        //para poder identificarlo y modificarlo para no cargarlo como nuevo
        const formData = {
            id: document.querySelector('#odontologo_id').value,
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            matricula: document.querySelector('#matricula').value,

        };

        //invocamos utilizando la función fetch la API odontologos con el método PUT que modificará
        //el odontologo que enviaremos en formato JSON
        const url = URL_BASE + '/odontologos';
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

    //Es la funcion que se invoca cuando se hace click sobre el id de un odontologo del listado
    //se encarga de llenar el formulario con los datos del odontologo
    //que se desea modificar
    function findBy(id) {
          const url = URL_BASE + '/odontologos'+"/"+id;
          const settings = {
              method: 'GET'
          }
          fetch(url,settings)
          .then(response => response.json())
          .then(data => {
              let odontologo = data;
              document.querySelector('#odontologo_id').value = odontologo.id;
              document.querySelector('#nombre').value = odontologo.nombre;
              document.querySelector('#apellido').value = odontologo.apellido;
              document.querySelector('#matricula').value = odontologo.matricula;
              //el formulario por default esta oculto y al editar se habilita
              document.querySelector('#div_odontologo_updating').style.display = "block";
          }).catch(error => {
            Swal.fire("Maldición!", error, "error");        })
      }


