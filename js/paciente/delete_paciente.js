function deleteBy(id) {
  Swal.fire({
    title: "Estás seguro?",
    text: "Se va a eliminar el paciente con Id " + id,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Claro que si!",
    cancelButtonText: "No, mejor no",
  }).then((result) => {
    if (result.isConfirmed) {
      //con fetch invocamos a la API de pacientes con el método DELETE
      //pasandole el id en la URL
      const url = URL_BASE + "/pacientes/" + id;
      const settings = {
        method: "DELETE",
      };
      fetch(url, settings).then((response) => response.json());

      //borrar la fila del paciente eliminado
      let row_id = "#tr_" + id;
      document.querySelector(row_id).remove();

      Swal.fire({
        title: "Eliminado!",
        text: "Se eliminó el paciente seleccionado.",
        icon: "success",
        confirmButtonText: "Perfecto!",
      });
    }
  });
}
