import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState("");
  const [id, setId] = useState("");
  const [editar, setEditar] = useState(false);

  const [empleadosList, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Registro Exitoso!!!</strong>",
        html:
          "<i>El empleado <strong>" +
          nombre +
          "</strong> fue registrado con exito!!!</i>",
        icon: "success",
        timer: 3000,
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        title: "<strong>Acualizado con Exitoso!!!</strong>",
        html:
          "<i>El empleado <strong>" +
          nombre +
          "</strong> fue actualizado!!!</i>",
        icon: "success",
        timer: 3000,
      });
    }).catch(function(error){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
      });
    });
  };

  const deleteEmple = (val) => {
    Swal.fire({
      title: "Confirmar Eliminado?",
      html:
        "<i>Realmente desea eliminar a <strong>" +
        val.nombre +
        "</strong>?</i>",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminarlo!",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
          getEmpleados();
          limpiarCampos();
          Swal.fire({
            icon: "sucess",
            title: val.nombre + " fue eliminado.",
            showCancelButton: false,
            timer: 3000,
          });
        }).catch(function(error){
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logro eliminar el empleado!",
            footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde":JSON.parse(JSON.stringify(error)).message
          });
        });
      }
    });
  };

  const limpiarCampos = () => {
    setNombre("");
    setEdad("");
    setPais("");
    setCargo("");
    setAnios("");
    setId("");
    setEditar(false);
  };

  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };

  getEmpleados();

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTION DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre
            </span>
            <input
              type="text"
              value={nombre}
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Nombre"
              aria-label="Nombre"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad
            </span>
            <input
              type="text"
              value={edad}
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Edad"
              aria-label="Edad"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais
            </span>
            <input
              type="text"
              value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Pais"
              aria-label="Pais"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo
            </span>
            <input
              type="text"
              value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Cargo"
              aria-label="Cargo"
              aria-describedby="basic-addon1"
            ></input>
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Experiencia
            </span>
            <input
              type="text"
              value={anios}
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese Años"
              aria-label="Años"
              aria-describedby="basic-addon1"
            ></input>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {editar ? (
            <div>
              <button className="btn btn-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button className="btn btn-info m-2" onClick={limpiarCampos}>
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-success" onClick={add}>
              Registrar
            </button>
          )}
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-info"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => {
                        deleteEmple(val);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
