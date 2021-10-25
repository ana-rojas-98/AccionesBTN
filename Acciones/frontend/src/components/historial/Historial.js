import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getHistorial } from '../../actions/historial';

import DataTable from 'react-data-table-component';
import moment from 'moment';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import './diseño.css';
import regeneratorRuntime from "regenerator-runtime"


const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data.resultado, null, 2)}</pre>;

const tablaCampeones =[
  { id:"2", tipo:"Real Madrid CF", resultado:"Valencia CF"}]
const columnas =[
  {
    name:"Id",
    selector:row => row.id,
    sortable: true,
    grow:0.2
  },
  {
    name:"Tipo",
    selector:row => row.tipo,
    grow:0.4
  },
  {
    name:"Fecha",
    selector:row => row.created_at,
    sortable: true,
    grow:0.5,
    cell: row => <div>{moment(row.created_at).format("YYYY-MM-DD HH:mm:ss")}</div>
  },
  {
    name:"Resultado",
    selector:row => row.resultado,
    omit: true,
  },
  
]

const paginacion={
  rowsPerPageText: 'Filas por página',
  rangeSeparatorText: "de", 
  selectAllRowsItem: true, 
  selectAllRowsItemText: "Todos"
}
export class Historial extends Component {
    static propTypes = {
      historials: PropTypes.array.isRequired,
      getHistorial: PropTypes.func.isRequired,
    };

     state={
      busqueda: '',
      historial: []
    }

    onChange=async e=>{
      e.persist();
      await this.setState({busqueda: e.target.value});
      this.filtrarElementos();
      
    }
    filtrarElementos=()=>{
      var search=this.props.historials.filter(item=>{
        if(moment(item.created_at).format("YYYY-MM-DD HH:mm:ss").includes(this.state.busqueda) || item.tipo.includes(this.state.busqueda)){
          return item;
        }
      });
      this.setState({historial: search});
    }

    
    
      componentDidMount() {
        this.props.getHistorial();
        
      }
     
      
    render() { 
      
        return (
          
            
            <div className="table-responsive">

            <div className='table-page'>
               <div className='table-desing'>
          <div className="barraBusqueda">
            <input
              type="text"
              placeholder="Buscar"
              className="textField"
              name="busqueda"
              value={this.state.busqueda}
              onChange={this.onChange}
            />
            <button type="button" className="btnBuscar" /*onClick={onClear}*/>
              {" "}
              <FontAwesomeIcon icon={faSearch} />
            </button>
           </div>

               
               <DataTable
               
               columns={columnas}
               data={this.state.historial}
               title="Historial ordenes"
               pagination
               paginationComponentOptions={paginacion}
               fixedHeader
               fixedHeaderScrollHeight="600px"
               expandableRows
               expandableRowsComponent={ExpandedComponent}
               noDataComponent={<span>No se encontró ningún elemento</span>}
               highlightOnHover
               pointerOnHover
               customStyles={{background: '#e4e9da'}}>
                 

               </DataTable>
               </div>
               </div>
            </div>
                
            
        )
    }
}

const mapStateToProps = (state) => ({
    historials: state.historials.historials,
  });
  
  export default connect(mapStateToProps, { getHistorial })(Historial);
