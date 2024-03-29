import React, { Component } from "react";
import uuid from "uuid";
import PropTypes from "prop-types";

const stateInicial = {
  error: false,
  cita: {
    mascota: "",
    propietario: "",
    fecha: "",
    hora: "",
    sintomas: ""
  }
};

class NuevaCita extends Component {
  state = { ...stateInicial };

  //here I'm handling the all inputs changes
  handleChange = e => {
    //with the spread opetator is making copy of the current state and it's
    //overriding then the targeting name
    //IT MUST BE THE SAME NAME IN THE STATE AND IN THE NAME OF THE INPUT
    this.setState({
      cita: {
        ...this.state.cita,
        [e.target.name]: e.target.value
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { mascota, propietario, fecha, hora, sintomas } = this.state.cita;

    if (
      mascota === "" ||
      propietario === "" ||
      fecha === "" ||
      hora === "" ||
      sintomas === ""
    ) {
      this.setState({ error: true });
      return;
    }
    //this is compying all the attributes from the cita's state to the new constant
    const nuevaCita = { ...this.state.cita };
    //uuid emulates a data base id
    nuevaCita.id = uuid();
    this.props.crearNuevaCita(nuevaCita);

    this.setState({ ...stateInicial });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="card mt-5 py-5">
        <div className="card-body">
          <h2 className="card-title text-center mb-5">
            Lllevar formulario para crear una nueva cita
          </h2>
          {/*if it has an error object, it will print it on the screen*/}
          {error ? (
            <div className="alert alert-danger mt-2 mb-5 text-center">
              Todos los campos son obligatorios
            </div>
          ) : null}
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Mascota
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Mascota"
                  name="mascota"
                  id="mascota"
                  onChange={this.handleChange}
                  value={this.state.cita.mascota}
                />
              </div>
            </div>
            {/*div form group*/}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Nombre Dueño
              </label>
              <div className="col-sm-8 col-lg-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nombre Dueño Mascota"
                  name="propietario"
                  id="propietario"
                  onChange={this.handleChange}
                  value={this.state.cita.propietario}
                />
              </div>
            </div>
            {/*div form group*/}
            {/*div form group*/}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">Fecha</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="date"
                  className="form-control"
                  name="fecha"
                  id="fecha"
                  onChange={this.handleChange}
                  value={this.state.cita.fecha}
                />
              </div>
              <label className="col-sm-4 col-lg-2 col-form-label">Hora</label>
              <div className="col-sm-8 col-lg-4">
                <input
                  type="time"
                  className="form-control"
                  name="hora"
                  id="hora"
                  onChange={this.handleChange}
                  value={this.state.cita.hora}
                />
              </div>
            </div>
            {/*div form group*/}
            <div className="form-group row">
              <label className="col-sm-4 col-lg-2 col-form-label">
                Síntomas
              </label>
              <div className="col-sm-8 col-lg-10">
                <textarea
                  className="form-control"
                  name="sintomas"
                  placeholder="Describe los Sintomas"
                  id="sintomas"
                  onChange={this.handleChange}
                  value={this.state.cita.sintomas}
                />
              </div>
            </div>
            {/*div form group*/}
            <button
              typ="submit"
              className="py-3 mt-2 btn btn-success"
              value="Agregar Nueva Cita"
            >
              Agregar Nueva Cita
            </button>
          </form>
        </div>
      </div>
    );
  }
}

NuevaCita.propTypes = {
  crearNuevaCita: PropTypes.func.isRequired
};

export default NuevaCita;
