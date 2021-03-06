function deleteBy(id) {
  Swal.fire({
    title: "Estás seguro?",
    text: "Se va a eliminar el odontólogo con Id " + id,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Claro que sí!",
    cancelButtonText: "No, mejor no",
  }).then((result) => {
    if (result.isConfirmed) {
      //con fetch invocamos a la API de odontologos con el método DELETE
      //pasandole el id en la URL
      const url = URL_BASE + "/odontologos/" + id;
      const settings = {
        method: "DELETE",
      };
      fetch(url, settings).then((response) => response.json())
      .then(data => {

        //borrar la fila del odontologo eliminado
        let row_id = "#tr_" + id;

        document.querySelector(row_id).remove();
          Swal.fire({
            title: "Eliminado!",
            text: data,
            icon: "success",
            confirmButtonText: "Perfecto!"
          });
   })
   .catch(error => {
           //Si hay algun error se muestra un mensaje diciendo que el odontologo
           //no se pudo borrar y se intente nuevamente

             Swal.fire("Maldición!", "Hubo un problema!", "error");
    });

    }
  });
}
