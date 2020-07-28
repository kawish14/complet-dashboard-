import React from 'react';
import { loadModules } from 'esri-loader';
import { request } from '@esri/arcgis-rest-request';
import './table.css';
import Axios from 'axios';

class CustomerTable extends React.Component{
    constructor(props){
        super(props);
        this.state= {
            customer: [],
            loading:true
        }
    }

    componentDidMount() {

        request('http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/6/query', {
             params: {
                  where: "1=1",
                  outFields: ["*"]
                 }
         })
        .then(res => {
                
                this.setState({
                    loading: false,
                    customer: res.features
                })
                window.$('#example').DataTable();
             console.log(this.state.customer)
            })
        
    } 

    /* exportExcel = (tableId, filename = '') => {
        let downloadLink;
        let dataType = 'application/vnd.ms-excel';
        let tableSelect = document.getElementById(tableId);
        let tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

        filename = filename ? filename + '.xls' : 'excel_data.xls';

        downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink)

        if (navigator.msSaveOrOpenBlob) {
            let blob = new Blob(['\ufeff', tableHTML], {
                type: dataType
            });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            downloadLink.href = 'data:' + dataType + ' , ' + tableHTML

            downloadLink.download = filename
            downloadLink.click()
        }

    } */
     
    render(){
        const { loading} = this.state
        return(
            <div className="page-wrapper"> 
                <div className="container-fluid content">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Customer Datatable</h5>
                                   {/*  <button className="excelButtonDate" onClick={() => this.exportExcel('example', 'Selected Data')}> Export Data</button> */}
                                    <div className="table-responsive">
                                        
                                        <table id="example" className="table table-striped table-bordered">
                                           
                                            <thead>
                                                <tr>
                                                    <th><strong>Name</strong></th>
                                                    <th><strong>ID</strong></th>
                                                    <th><strong>Type</strong></th>
                                                    <th><strong>FAT</strong></th>
                                                    <th><strong>DC</strong></th>
                                                    <th><strong>POP</strong></th>
                                                    <th><strong>Location</strong></th>
                                                    <th><strong>City</strong></th>
                                                    
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                  {
                                                    this.state.customer.map((item, index) => {
                                                        return (
                                                            <tr key={item.attributes.OBJECTID}>
                                                                <td>{item.attributes.Name}</td>
                                                                <td>{item.attributes.ID}</td>
                                                                <td>{item.attributes.Type}</td>
                                                                <td>{item.attributes.FAT}</td>
                                                                <td>{item.attributes.DC}</td>
                                                                <td>{item.attributes.POP}</td>
                                                                <td>{item.attributes.Comments}</td>
                                                                <td>{item.attributes.City}</td>
                                                                
                                                                <td>
                                                                    <button style={{fontSize:10, paddingRight:23, textAlign:"center" }} className="btn btn-success" >Active</button>
                                                                   
                                                                </td>
                                                               
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
                        <span style={{ paddingLeft: 500, display: 'flex', flex: 1, marginTop: 100, color:'#3a4248', fontSize:'17px' }}><strong>Loading. . . .</strong></span>
                              
                    : null
                    }
                </div>
                    
            </div>
          
        )
    }
}
export {CustomerTable}