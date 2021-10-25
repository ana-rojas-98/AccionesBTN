import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { putApis, postApis } from '../../actions/apis';

export class FormCreate extends Component {

    state = {
       api: '', 
       SecretKey: '', 
       active: false, 
       valueBTC: '',
       porcentaje: '',
       valorAbajo: '',
       valorArriba: '',
       rangoCompraVenta: '',
       nuevoAbajoAbajo: '',
       nuevoAbajoArriba: '',
       nuevoArribaAbajo: '',
       nuevoArribaArriba: '',
      };

      static propTypes = {
        postApis: PropTypes.func.isRequired,
        cerrarModal: PropTypes.func.isRequired
      };

      onChange = (e) => this.setState({ [e.target.name]: e.target.value });
      onChangeCheck = (e) => this.setState({ [e.target.name]: e.target.checked });

      onSubmit = (e) => {
        e.preventDefault();
        const { api, SecretKey, active, valueBTC, porcentaje, valorAbajo, valorArriba, rangoCompraVenta,nuevoAbajoAbajo,nuevoAbajoArriba,nuevoArribaAbajo,nuevoArribaArriba } = this.state;
        const apis = { api, SecretKey, active, valueBTC, porcentaje, valorAbajo, valorArriba, rangoCompraVenta,nuevoAbajoAbajo,nuevoAbajoArriba,nuevoArribaAbajo,nuevoArribaArriba };
        this.props.postApis(apis);
        this.setState({
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
      };

    render() {
        const {api, SecretKey, active, valueBTC, porcentaje, valorAbajo, valorArriba, rangoCompraVenta,nuevoAbajoAbajo,nuevoAbajoArriba,nuevoArribaAbajo,nuevoArribaArriba } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
            <h2>Agregar ordenes</h2>
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

export default connect(null, { putApis, postApis })(FormCreate);