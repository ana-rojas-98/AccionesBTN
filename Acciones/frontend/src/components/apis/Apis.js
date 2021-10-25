import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getApis } from '../../actions/apis';

import {Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import FormCreate from './FormCreate';
import FormUptade from './FormUptade';
import DataTable from 'react-data-table-component';
import "./modalstyle.css"



export class Apis extends Component {
   

    
    state={
      abierto: false,
      componente: "", 
      formEditar: {id:"",
        api:"",
        SecretKey:"",
        active:"",
        valueBTC:"",
        porcentaje:"",
        valorAbajo:"",
        valorArriba: "",
        rangoCompraVenta: "",
        nuevoAbajoAbajo: "",
        nuevoAbajoArriba: "",
        nuevoArribaAbajo: "",
        nuevoArribaArriba: ""}
      
    }

    static propTypes = {
        apis: PropTypes.array.isRequired,
        getApis: PropTypes.func.isRequired,
      };

      componentDidMount() {
        this.props.getApis();
      }
      

      columnas =[
        {
          name: "Editar",
          cell: api => { 
            return (
                    
                    <button 
                        className="btn btn-danger btn-sm" 
                        onClick={() => this.editarApi(api)}>
                        <i className="fa fa-trash"></i> Editar
                    </button>
               
            );
        },
          ignoreRowClick: true,
          allowOverflow: true,
          button: true,
        },
        {
          name:"id",
          selector:row => row.id,
          sortable: true,
          grow:0.1,
          omit: true,
        },
        {
          name:"Activo",
          selector:row => row.active.toString(),
          grow:0.2
          
        },
        {
          name:"Valor",
          selector:row => row.valueBTC,
          sortable: true,
          grow:0.5,
        },
        {
          name:"Rango de actualización",
          selector:row => row.porcentaje,
          
        },
        {
          name:"Valor abajo",
          selector:row => row.valorAbajo,
         
        },
        {
          name:"Valor arriba",
          selector:row => row.valorArriba,
          
        },
        {
          name:"Rango compra y venta",
          selector:row => row.rangoCompraVenta,
          
        },
        {
          name:"Superior abajo auto",
          selector:row => row.nuevoAbajoAbajo,
          
        },
        {
          name:"Inferior arriba auto",
          selector:row => row.nuevoAbajoArriba,
          
          
        },
        {
          name:"Superior abajo auto",
          selector:row => row.nuevoArribaAbajo,
          
        },
        {
          name:"Inferior arriba auto",
          selector:row => row.nuevoArribaArriba,
          
        },
        
        
      ]
      


       editarApi=(api)=>{
        this.setState({abierto: !this.state.abierto, componente: "Editar"});
        this.setState({formEditar: {id:api.id,
        api:api.api,
        SecretKey:api.SecretKey,
        active:api.active,
        valueBTC:api.valueBTC,
        porcentaje:api.porcentaje,
        valorAbajo:api.valorAbajo,
        valorArriba: api.valorArriba,
        rangoCompraVenta: api.rangoCompraVenta,
        nuevoAbajoAbajo: api.nuevoAbajoAbajo,
        nuevoAbajoArriba: api.nuevoAbajoArriba,
        nuevoArribaAbajo: api.nuevoArribaAbajo,
        nuevoArribaArriba: api.nuevoArribaArriba
       }})
      }
      

      abrirModalEditar=()=>{
        this.setState({abierto: !this.state.abierto, componente: "Editar"});
      }
    
      cerrarModal= (param) =>{
        this.setState({abierto: param, componente: "Cerrar"});
      }
      cerrarModalPadre= (param) =>{
        this.setState({abierto: !this.state.abierto, componente: "Cerrar"});
      }
      abrirModalCrear=()=>{
        this.setState({abierto: !this.state.abierto, componente: "Crear"});
      }
    
      
    render() {
      const modalStyles={
         position: "absolute",
         left: '30%',
         margin: 'auto',
         width: '80%'
      }
        let botonCrear; 
        if (this.props.apis.length){
        }
        else
        { 
          botonCrear=<Button color="success" onClick={this.abrirModalCrear}>Crear api</Button>
        }
        
        
        return (
        <div>
          
            {botonCrear}
            <div className="table-responsive" style={{ maxWidth: '100%' }}>
            <div className='table-page'>
               <div className='table-desing'>
              <DataTable
               columns={this.columnas}
               data={this.props.apis}
               title="Ordenes"
               noDataComponent={<span>No se encontró ningún elemento</span>}
               />
               
            </div>
            </div>
            </div>
            <Fragment>

              

           

        <Modal isOpen={this.state.abierto} >
        <ModalHeader toggle={this.cerrarModalPadre} charCode="X"></ModalHeader>

         {
             this.state.componente == "Editar" &&
             <ModalBody><FormUptade ApiEdit={this.state.formEditar} cerrarModal={this.cerrarModal}></FormUptade></ModalBody>

         }

         {
            this.state.componente == "Crear" &&
            <ModalBody><FormCreate cerrarModal={this.cerrarModal}></FormCreate></ModalBody>
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





