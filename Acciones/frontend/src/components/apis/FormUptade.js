import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { putApis, getValidacion} from '../../actions/apis';
import { returnErrors, createMessage } from '../../actions/messages';

export class FormUptade extends Component {
   
    static propTypes = {
      apis: PropTypes.array.isRequired,
      putApis: PropTypes.func.isRequired,
      ApiEdit: PropTypes.object.isRequired,
      cerrarModal: PropTypes.func.isRequired,
      getValidacion: PropTypes.func.isRequired,
    };
     
    state = this.props.ApiEdit;

      onChange = (e) => this.setState({ [e.target.name]: e.target.value });
      onChangeCheck = (e) => this.setState({ [e.target.name]: e.target.checked });

      onSubmit = (e) => {

        if(this.state.valorAbajo>=this.state.valueBTC)
        {

          this.props.getValidacion('Valor abajo debe ser menor que el valor actual');
          this.props.cerrarModal(false)

        }
        else{
        if(this.state.valorArriba<=this.state.valueBTC)
        {

          this.props.getValidacion('Valor arriba debe ser mayor que el valor actual');
          this.props.cerrarModal(false)

        }
        else{
          e.preventDefault();
          this.props.putApis(this.state);
          this.setState({
              id: '',
              api: '', 
              SecretKey: '', 
              active: '', 
              valueBTC: '',
              porcentaje: '',
              valorAbajo: '',
              valorArriba: '',
              rangoCompraVenta: '',
              nuevoAbajoAbajo: '',
              nuevoAbajoArriba: '',
              nuevoArribaAbajo: '',
              nuevoArribaArriba: '',
          });
          this.props.cerrarModal(false)
        }
      }
        
      };

    render() {
      const { id, api, SecretKey, active, valueBTC, porcentaje, valorAbajo, valorArriba, rangoCompraVenta,nuevoAbajoAbajo,nuevoAbajoArriba,nuevoArribaAbajo,nuevoArribaArriba } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
            <h2>Editar ordenes</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Api</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="api"
                  onChange={this.onChange}
                  value={api}
                />
              </div>
              <div className="form-group">
                <label>Secret key</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="SecretKey"
                  onChange={this.onChange}
                  value={SecretKey}
                />
              </div>

              <div className="form-check">
               <input  
                className="form-check-input" 
                type="checkbox" 
                name="active" 
                checked={active}
                onChange={this.onChangeCheck}
                />
               <label>Activo</label>
               </div>


              <div className="form-group">
                <label>valueBTC</label>
                <input
                  className="form-control"
                  type="number"
                  name="valueBTC"
                  onChange={this.onChange}
                  value={valueBTC}
                />
              </div>
              <div className="form-group">
                <label>Rango actualización</label>
                <input
                  className="form-control"
                  type="number"
                  name="porcentaje"
                  onChange={this.onChange}
                  value={porcentaje}
                />
              </div>
              <div className="form-group">
                <label>Orden abajo</label>
                <input
                  className="form-control"
                  type="number"
                  name="valorAbajo"
                  onChange={this.onChange}
                  value={valorAbajo}
                />
              </div>
              <div className="form-group">
                <label>Orden arriba</label>
                <input
                  className="form-control"
                  type="number"
                  name="valorArriba"
                  onChange={this.onChange}
                  value={valorArriba}
                />
              </div>
              <div className="form-group">
                <label>Rango compra y venta</label>
                <input
                  className="form-control"
                  type="number"
                  name="rangoCompraVenta"
                  onChange={this.onChange}
                  value={rangoCompraVenta}
                />
              </div>
              <div className="form-group">
                <label>Superior abajo auto</label>
                <input
                  className="form-control"
                  type="number"
                  name="nuevoAbajoAbajo"
                  onChange={this.onChange}
                  value={nuevoAbajoAbajo}
                />
              </div>
              <div className="form-group">
                <label>Inferior abajo auto</label>
                <input
                  className="form-control"
                  type="number"
                  name="nuevoAbajoArriba"
                  onChange={this.onChange}
                  value={nuevoAbajoArriba}
                />
              </div>
              <div className="form-group">
                <label>Superior arriba auto</label>
                <input
                  className="form-control"
                  type="number"
                  name="nuevoArribaAbajo"
                  onChange={this.onChange}
                  value={nuevoArribaAbajo}
                />
              </div>
              <div className="form-group">
                <label>Inferior arriba auto</label>
                <input
                  className="form-control"
                  type="number"
                  name="nuevoArribaArriba"
                  onChange={this.onChange}
                  value={nuevoArribaArriba}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Actualizar
                </button>
              </div>
            </form>
          </div>
        )
    }
}




const mapStateToProps = (state) => ({
  apis: state.apis.apis,
 
});

export default connect(mapStateToProps, { putApis,getValidacion })(FormUptade);