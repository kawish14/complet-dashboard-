import React from 'react'
import { loadModules, setDefaultOptions } from 'esri-loader';
import './service.css'
setDefaultOptions({ version: '4.14' })

export default class Services extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            falconBoQ:[],
            JoharBoQ:[]
        }
        this.button = React.createRef()
        this.falconBoQ = React.createRef()
        this.JoharBoQ = React.createRef()
    }
    componentDidMount(){
        let map = this.props.map
        let view = this.props.view
        let layer
        loadModules(["esri/request", "esri/layers/MapImageLayer", "esri/widgets/Legend"],{css:false})
        .then(([Request, MapImageLayer, Legend]) => {

            view.ui.add(this.button.current, "top-left")

            let url = "https://localhost:6443/arcgis/rest/services/Project?f=pjson"
            let options = { responseType: "json" };
            Request(url, options).then((response)=>{
        
                let result = response.data;
                var service = document.getElementById("service");
                view.ui.add(service, 'top-right')
                // set event listener on change
                service.addEventListener("change", (e) => {
                    var selectedservice = service.options[service.selectedIndex].textContent;

                    layer = new MapImageLayer({
                        url: "http://localhost:6080/arcgis/rest/services/" + selectedservice + "/MapServer"
                    });
                    map.removeAll();
                    map.add(layer);

                    // wait until layer is loaded.
                     layer.when(()=> {
                         
                 /*        var toc = document.getElementById("toc");
                        toc.innerHTML = "";

                        var layerlist = document.createElement("ul");
                        toc.appendChild(layerlist); */
                         if (e.target.value === "Project/Gulistan_e_Johar"){
                             this.setState({
                                JoharBoQ:e.target.value,
                                 falconBoQ:[]
                            })
                            
                             view.goTo({
                                 target: [67.130037, 24.918743],
                                 zoom: 15
                             });
                         }
                         if (e.target.value === "Project/Falcon_Complex"){
                             this.setState({
                                 falconBoQ: e.target.value,
                                 JoharBoQ:[]
                             })
                         
                             view.goTo({
                                 target: [67.090628, 24.866117],
                                 zoom: 15
                             });
                         }
                       
                    }) 
                });

                for (var i = 0; i < result.services.length; i++) {
                    var option = document.createElement("option");
                    option.textContent = result.services[i].name;
                    service.appendChild(option)
                }
            })

            let legend = new Legend({
                view: view
            });
            view.ui.add(legend, "bottom-left");

            var coordsWidget = document.createElement("div");
            coordsWidget.id = "coordsWidget";
            coordsWidget.className = "esri-widget esri-component";
            coordsWidget.style.padding = "7px 15px 5px";
            view.ui.add(coordsWidget, "bottom-right");

            //*** Update lat, lon, zoom and scale ***//
            function showCoordinates(xy) {
                var coords = "Lat/Lon " + xy.latitude.toFixed(6) + " " + xy.longitude.toFixed(6) +
                    " | Scale 1:" + Math.round(view.scale * 1) / 1 +
                    " | Zoom " + view.zoom;
                coordsWidget.innerHTML = coords;
            }

            //*** Add event and show center coordinates after the view is finished moving e.g. zoom, pan ***//
            view.watch(["stationary"], function () {
                showCoordinates(view.center);
            });

            //*** Add event to show mouse coordinates on click and move ***//
            view.on(["pointer-down", "pointer-move"], function (evt) {
                showCoordinates(view.toMap({ x: evt.x, y: evt.y }));
            });

        })
    }

    table = () => {
        let view = this.props.view
        if (this.state.falconBoQ === "Project/Falcon_Complex") {
            this.props.height('60vh', '30vh')

        }
        if (this.state.JoharBoQ === "Project/Gulistan_e_Johar") {
            this.props.height('60vh', '30vh')
          
        }
    }
    closeBoQTable = () =>{
        this.setState({
            falconBoQ:[],
            JoharBoQ:[]
        })
        this.props.height('90vh', '0vh')
    }
    render(){
        const falconBoQ = this.state.falconBoQ
        const JoharBoQ = this.state.JoharBoQ
        let tables;
        if (falconBoQ === "Project/Falcon_Complex"){
            tables = <table className="table table-striped table-bordered" ref={this.falconBoQ}>
                <tr>
                    <th className="heading">Category</th>
                    <th className="heading">Item</th>
                    <th className="heading">Unit</th>
                    <th className="heading">Quantity</th>
                </tr>

                <tr>
                    <td rowspan="4">Services</td>
                    <td>Civil Work</td>
                    <td>Meter</td>
                    <td>7329</td>
                </tr>
                <tr>
                    <td>Excavation</td>
                    <td>Meter</td>
                    <td>6600</td>
                </tr>
                <tr>
                    <td>Boring</td>
                    <td>Meter</td>
                    <td>729</td>
                </tr>
                <tr>
                    <td>Duct OFC Pulling</td>
                    <td>Meter</td>
                    <td>27,278</td>
                </tr>

                <tr>
                    <td rowspan="2">Civil Structure</td>
                    <td>3'x3'x3' HH (Inner Dimension)</td>
                    <td>No.</td>
                    <td>226</td>
                </tr>
                <tr>
                    <td>Base (plintd) for DC</td>
                    <td>No.</td>
                    <td>2</td>
                </tr>

                <tr>
                    <td rowspan="2">Conduit</td>
                    <td>HDPE Duct (57mm)</td>
                    <td>Meter</td>
                    <td>7695</td>
                </tr>
                <tr>
                    <td>Couplers</td>
                    <td>No.</td>
                    <td>77</td>
                </tr>

                <tr>
                    <td rowspan="4">Transmedia</td>
                    <td>4F Duct FOC</td>
                    <td>Meter</td>
                    <td>12,55</td>
                </tr>
                <tr>
                    <td>12F Duct FOC</td>
                    <td>Meter</td>
                    <td>96,15</td>
                </tr>
                <tr>
                    <td>24F Duct FOC</td>
                    <td>Meter</td>
                    <td>12,428</td>
                </tr>
                <tr>
                    <td>96F Duct FOC</td>
                    <td>Meter</td>
                    <td>39,80</td>
                </tr>

                <tr>
                    <td rowspan="1">OSP Structure</td>
                    <td>144 Ports Distribution Cabinet (DC)</td>
                    <td>No.</td>
                    <td>2</td>
                </tr>

                <tr>
                    <td rowspan="3">OSP Equipment</td>
                    <th>2x16 PLC Splitter </th>
                    <td>No.</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>1x8 PLC Splitter</td>
                    <td>No.</td>
                    <td>106</td>
                </tr>
                <tr>
                    <td>24F Underground Joint Closure</td>
                    <td>No.</td>
                    <td>5</td>
                </tr>

                <tr>
                    <td rowspan="2">CCTV Equipments</td>
                    <td>Poles (15ft) with Plinth</td>
                    <td>No.</td>
                    <td>122</td>
                </tr>
                <tr>
                    <td>Cameras</td>
                    <td>No.</td>
                    <td>254</td>
                </tr>
            </table>
        }
        if (JoharBoQ === "Project/Gulistan_e_Johar"){
            tables = <table className="table table-striped table-bordered" ref={this.falconBoQ}>
                <tr>
                    <th className="heading">Category</th>
                    <th className="heading">Item</th>
                    <th className="heading">Unit</th>
                    <th className="heading">Quantity</th>
                </tr>

                <tr>
                    <td rowspan="4">Services</td>
                    <td>Civil Work</td>
                    <td>Meter</td>
                    <td>7329</td>
                </tr>
                <tr>
                    <td>Excavation</td>
                    <td>Meter</td>
                    <td>6600</td>
                </tr>
                <tr>
                    <td>Boring</td>
                    <td>Meter</td>
                    <td>729</td>
                </tr>
                <tr>
                    <td>Duct OFC Pulling</td>
                    <td>Meter</td>
                    <td>27,278</td>
                </tr>

                <tr>
                    <td rowspan="2">Civil Structure</td>
                    <td>3'x3'x3' HH (Inner Dimension)</td>
                    <td>No.</td>
                    <td>226</td>
                </tr>
                <tr>
                    <td>Base (plintd) for DC</td>
                    <td>No.</td>
                    <td>2</td>
                </tr>

                <tr>
                    <td rowspan="2">Conduit</td>
                    <td>HDPE Duct (57mm)</td>
                    <td>Meter</td>
                    <td>7695</td>
                </tr>
                <tr>
                    <td>Couplers</td>
                    <td>No.</td>
                    <td>77</td>
                </tr>

                <tr>
                    <td rowspan="4">Transmedia</td>
                    <td>4F Duct FOC</td>
                    <td>Meter</td>
                    <td>12,55</td>
                </tr>
                <tr>
                    <td>12F Duct FOC</td>
                    <td>Meter</td>
                    <td>96,15</td>
                </tr>
                <tr>
                    <td>24F Duct FOC</td>
                    <td>Meter</td>
                    <td>12,428</td>
                </tr>
                <tr>
                    <td>96F Duct FOC</td>
                    <td>Meter</td>
                    <td>39,80</td>
                </tr>

                <tr>
                    <td rowspan="1">OSP Structure</td>
                    <td>144 Ports Distribution Cabinet (DC)</td>
                    <td>No.</td>
                    <td>2</td>
                </tr>

                <tr>
                    <td rowspan="3">OSP Equipment</td>
                    <th>2x16 PLC Splitter </th>
                    <td>No.</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>1x8 PLC Splitter</td>
                    <td>No.</td>
                    <td>106</td>
                </tr>
                <tr>
                    <td>24F Underground Joint Closure</td>
                    <td>No.</td>
                    <td>5</td>
                </tr>

                <tr>
                    <td rowspan="2">CCTV Equipments</td>
                    <td>Poles (15ft) with Plinth</td>
                    <td>No.</td>
                    <td>122</td>
                </tr>
                <tr>
                    <td>Cameras</td>
                    <td>No.</td>
                    <td>254</td>
                </tr>
            </table>
        }
        return (
            <div>
                <select id="service">
                    <option value="None">None</option>
                </select>
                <button onClick={this.table} className="BoqButton" ref={this.button}>BoQ</button>
          
                    <div className="tableResponsive">
                        {tables}
                    <div className="clodeBoQTable" onClick={this.closeBoQTable}><i className="far fa-window-close"></i></div>
                    </div>
          
            </div>
        
        ) 
    }
}