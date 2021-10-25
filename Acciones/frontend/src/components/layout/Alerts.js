import React, { Component, Fragment } from 'react';
import { withAlert } from 'react-alert';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


export class Alerts extends Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired,
  };

  componentDidUpdate(prevProps) {
    const { error, alert, message } = this.props;
    if (error !== prevProps.error) {
        if (error.msg.name) alert.error(`Name: ${error.msg.name.join()}`);
        if (error.msg.email) alert.error(`Email: ${error.msg.email.join()}`);
        if (error.msg.message) alert.error(`Message: ${error.msg.message.join()}`);
        if (error.msg.api) alert.error(`Api: ${error.msg.api.join()}`);
        if (error.msg.Secretkey) alert.error(`Secret key: ${error.msg.Secretkey.join()}`);
        if (error.msg.active) alert.error(`Activo: ${error.msg.active.join()}`);
        if (error.msg.valueBTC) alert.error(`valor: ${error.msg.valueBTC.join()}`);
        if (error.msg.valorArriba) alert.error(`Valor arriba: ${error.msg.valorArriba.join()}`);
        if (error.msg.valorAbajo) alert.error(`Valor abajo: ${error.msg.valorAbajo.join()}`);
        if (error.msg.rangoCompraVenta) alert.error(`Rango compra y venta: ${error.msg.rangoCompraVenta.join()}`);
        if (error.msg.porcentaje) alert.error(`Rango actualización: ${error.msg.porcentaje.join()}`);
        if (error.msg.nuevoAbajoAbajo) alert.error(`Superior abajo auto: ${error.msg.nuevoAbajoAbajo.join()}`);
        if (error.msg.nuevoAbajoArriba) alert.error(`Inferior abajo auto: ${error.msg.nuevoAbajoArriba.join()}`);
        if (error.msg.nuevoArribaAbajo) alert.error(`Superior arriba auto: ${error.msg.nuevoArribaAbajo.join()}`);
        if (error.msg.nuevoArribaArriba) alert.error(`Inferior arriba auto: ${error.msg.nuevoArribaArriba.join()}`);

        if (error.msg.valor) alert.error(`Inferior arriba auto: ${error.msg.valor.join()}`);

        if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
        if (error.msg.username) alert.error(error.msg.username.join());
      }

    if (message !== prevProps.message) {
        if (message.deleteLead) alert.success(message.deleteLead);
        if (message.addLead) alert.success(message.addLead);
        if (message.passwordNotMatch) alert.error(message.passwordNotMatch);
        if (message.validacion) alert.error(message.validacion);
       
    }
    
  }

  render() {
    return (<Fragment />);
  }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages,
  });
  
  export default connect(mapStateToProps)(withAlert()(Alerts));



