import React from 'react';
import { request } from '@esri/arcgis-rest-request';
import './table.css';
import Axios from 'axios';

class DCTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dc:[],
            loading: true
        }
    }

      componentDidMount() {
   
          request('http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1/query', {
              params: {
                  where: "1=1",
                  outFields: ["*"]
              }
          })
              .then(res => {
                console.log(res)
                  this.setState({
                      loading: false,
                      dc: res.features
                  })
                  window.$('#example').DataTable();
                  console.log(this.state.dc)
              })  
    } 

    render() {
        const { loading } = this.state
        return (
            <div className="page-wrapper">
                <div className="container-fluid content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">DC Datatable</h5>
                                    <div className="table-responsive">
                                        <table id="example" className="table table-striped table-bordered">

                                            <thead>
                                                <tr>
                                                    <th><strong>Name</strong></th>
                                                    <th><strong>ID</strong></th>
                                                    <th><strong>POP</strong></th>     
                                                    <th><strong>Splitter</strong></th>
                                                    <th><strong>City</strong></th>
                                                    <th><strong>Location</strong></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    this.state.dc.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.attributes.Name}</td>
                                                                <td>{item.attributes.ID}</td>
                                                                <td>{item.attributes.POP}</td>
                                                                <td>{item.attributes.Splitter}</td>                                                  
                                                                <td>{item.attributes.City}</td>
                                                                <td>{item.attributes.Comment}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }


                                            </tbody>

                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {loading ?
                        <span style={{ paddingLeft: 500, display: 'flex', flex: 1, marginTop: 100, color: '#3a4248', fontSize: '17px' }}><strong>Loading. . . .</strong></span>

                        : null
                    }
                </div>

            </div>

        )
    }
}

export { DCTable}