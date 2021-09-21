import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { putApis } from '../../actions/apis';

export class FormCreate extends Component {
   
   constructor(props) {
     super(props);
     const formapi =props.apiform;
   }
    
    state = {
        id:'',
        api: this.formapi.api, 
        SecretKey: this.formapi.SecretKey, 
        active: this.formapi.active, 
        valueBTC: this.formapi.valueBTC,
      };

      static propTypes = {
          putApis: PropTypes.func.isRequired,
      };

      onChange = (e) => this.setState({ [e.target.name]: e.target.value });

      onSubmit = (e) => {
        e.preventDefault();
        const { id  ,api, SecretKey, active, valueBTC } = this.state;
        const apis = { api, SecretKey, active, valueBTC };
        this.props.putApis(id, apis);
        this.setState({
            id: '',
            api: '', 
            SecretKey: '', 
            active: '', 
            valueBTC: '',
        });
      };

    render() {
        const { api, SecretKey, active, valueBTC } = this.state;
        return (
            <div className="card card-body mt-4 mb-4">
            <h2>Editar Api   formapi</h2>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="api"
                  onChange={this.onChange}
                  value={api}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="SecretKey"
                  onChange={this.onChange}
                  value={SecretKey}
                />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  className="form-control"
                  type="text"
                  name="active"
                  onChange={this.onChange}
                  value={active}
                />
              </div>
              <div className="form-group">
                <label>valueBTC</label>
                <textarea
                  className="form-control"
                  type="number"
                  name="valueBTC"
                  onChange={this.onChange}
                  value={valueBTC}
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        )
    }
}

export default connect(null, { putApis })(FormCreate);