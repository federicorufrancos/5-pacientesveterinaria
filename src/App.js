import React, { Component } from "react";
import "./bootstrap.min.css";
import Header from "./components/Header";
import NuevaCita from "./components/NuevaCita";
import ListaCitas from "./components/ListaCitas";
import PropTypes from "prop-types";

class App extends Component {
  state = {
    citas: []
  };

  componentDidMount() {
    console.log("did mount");
    const citasLS = localStorage.getItem("citas");
    if (citasLS) {
      this.setState({
        citas: JSON.parse(citasLS)
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("citas", JSON.stringify(this.state.citas));
  }

  crearNuevaCita = datos => {
    console.log(datos);
    //this is adding to the state's citas array a new entry
    const citas = [...this.state.citas, datos];

    this.setState({
      citas
    });
  };

  eliminarCita = id => {
    console.log("id a borrar: ", id);
    const citasActuales = [...this.state.citas];
    const citas = citasActuales.filter(cita => cita.id !== id);
    this.setState({
      citas
    });
  };

  render() {
    return (
      <div className="container">
        <Header titulo="Administrador Pacientes Veterinaria" />
        <div className="row">
          <div className="col-md-10 mx-auto">
            <NuevaCita crearNuevaCita={this.crearNuevaCita} />
          </div>
          <div className="mt-5 col-md-10 mx-auto">
            <ListaCitas
              citas={this.state.citas}
              eliminarCita={this.eliminarCita}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
