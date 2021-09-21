import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApis } from '../../actions/apis';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FormCreate from './FormCreate';
import FormUptade from './FormUptade';


export class Apis extends Component {
   
    static propTypes = {
        apis: PropTypes.array.isRequired,
        getApis: PropTypes.func.isRequired,
      };

      componentDidMount() {
        this.props.getApis();
      }
      

      state={
        abierto: false,
        componente: "", 
        formEditar: {id:"",
          api:"",
          SecretKey:"",
          active:"",
          valueBTC:""}
        
      }


      editarApi=(api)=>{
        this.setState({abierto: !this.state.abierto, componente: "Editar"});
        this.setState({formEditar: {id:api.id,
        api:api.api,
        SecretKey:api.SecretKey,
        active:api.active,
        valueBTC:api.valueBTC}})
      }
      

      abrirModalEditar=()=>{
        this.setState({abierto: !this.state.abierto, componente: "Editar"});
      }
    

      abrirModalCrear=()=>{
        this.setState({abierto: !this.state.abierto, componente: "Crear"});
      }
    

    render() {
        const modalStyles={
            position: "absolute",
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
        }

        return (
        <div>
            <Fragment>
            <h1>Apis list</h1>
            <Button color="success" onClick={this.abrirModalCrear}>Crear api</Button>
            <table className="table table-striped">

            <thead>
                <tr>
                  <th>ID</th>
                  <th>Api</th>
                  <th>Secret key</th>
                  <th>Activo</th>
                  <th>Valor</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {this.props.apis.map((api) => (
                  <tr key={api.id}>
                    <td>{api.id}</td>
                    <td>{api.api}</td>
                    <td>{api.SecretKey}</td>
                    <td>{api.active}</td>
                    <td>{api.valueBTC}</td>
                    <td>
                      <button
                        color="success" onClick={() => this.editarApi(api)}
                        className="btn btn-danger btn-sm"
                      >
                        {' '}
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

              </table>

        <Modal isOpen={this.state.abierto} style={modalStyles}>
        <Button color="secondary" onClick={this.abrirModalCrear}>Cerrar</Button>

         {
             this.state.componente == "Editar" &&
             <FormUptade apiform={this.state.formEditar}></FormUptade>

         }

         {
            this.state.componente == "Crear" &&
             <FormCreate></FormCreate>
         }
        
        </Modal>
            </Fragment>
        </div>
        )
    }
}


const mapStateToProps = (state) => ({
    apis: state.apis.apis,
  });

export default connect(mapStateToProps, { getApis })(Apis); 