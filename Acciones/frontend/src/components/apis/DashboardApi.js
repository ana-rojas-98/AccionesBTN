import React, { Fragment } from 'react';
import Apis from './Apis';
import Historial from '../historial/Historial';
import FormCreate from './FormCreate';
import FormUpdate from './FormUptade';

export default function DashboardApi() {
    return (
        <Fragment>
          <br></br>
          <br></br>
      <Apis />
      <Historial/>
    </Fragment>
    )
}