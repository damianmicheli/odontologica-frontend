window.addEventListener('load', function () {

    //Al cargar la pagina buscamos y obtenemos el formulario donde estarán
    //los datos que el usuario cargará del nuevo turno
    const formulario = document.querySelector('#add_new_turno');

    //Ante un submit del formulario se ejecutará la siguiente funcion
    formulario.addEventListener('submit', function (event) {

       //creamos un JSON que tendrá los datos del nuevo turno
        const formData = {
            nombre: document.querySelector('#nombre').value,
            apellido: document.querySelector('#apellido').value,
            matricula: document.querySelector('#matricula').value,

        };
        //invocamos utilizando la función fetch la API turnos con el método POST que guardará
        //el turno que enviaremos en formato JSON
        const url = URL_BASE + '/turnos';
        const settings = {
            method: 'POST',
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
                //Si hay algun error se muestra un mensaje diciendo que el turno
                //no se pudo guardar y se intente nuevamente
    
                Swal.fire("Maldición!", data, "error");
            }
            else{
                 //Si no hay ningun error se muestra un mensaje diciendo que el turno
                 //se agrego bien
    
                 Swal.fire(
                    "Correcto!",
                    "Ya registramos a <strong>" + data + "</strong> como nuevo <strong>turno</strong>!",
                    "success"
                  );
                 resetUploadForm();               
            }
        })
    
            .catch(error => {
                    //Si hay algun error se muestra un mensaje diciendo que el turno
                    //no se pudo guardar y se intente nuevamente
    
                      Swal.fire("Maldición!", "Hubo un problema inesperado!", "error");
                }
            )



                    
    });


    function resetUploadForm(){
        document.querySelector('#nombre').value = "";
        document.querySelector('#apellido').value = "";
         document.querySelector('#matricula').value = "";

    }

    (function(){
        let pathname = window.location.pathname;
        if(pathname === "/"){
            document.querySelector(".nav .nav-item a:first").addClass("active");
        } else if (pathname == "/turnoList.html") {
            document.querySelector(".nav .nav-item a:last").addClass("active");
        }
    })();
});