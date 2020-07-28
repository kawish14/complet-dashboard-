import React from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import './south.css'

setDefaultOptions({ version: '4.14' })
export default class QueryODB extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            loading: true,
           
        }
    }

     componentDidMount(){
        let _this = this
        let map = this.props.map;
        let view = this.props.view;

        loadModules(["esri/tasks/support/Query", "esri/tasks/QueryTask", "esri/layers/FeatureLayer", 'esri/widgets/Expand', "esri/layers/GraphicsLayer", "esri/geometry/geometryEngine",
            "esri/Graphic", "esri/geometry/support/webMercatorUtils", "esri/layers/GeoJSONLayer",
            "esri/geometry/Point", "esri/geometry/SpatialReference"
        ], { css: false })
            .then(([Query, QueryTask, FeatureLayer, Expand, GraphicsLayer, geometryEngine, Graphic, webMercatorUtils, GeoJSONLayer,
                Point, SpatialReference
            ]) => {


        view.ui.add(
            [
                new Expand({
                    view: view,
                    content: document.getElementById("infoDiv"),
                    group: "bottom-right",
                    expanded: false,
                    expandIconClass: "fas fa-table" 
                })
            ],
            "top-right"
        );
        let g
        let OdbfromPOP = document.getElementById('odb-type');
        var attribute = document.getElementById("attribute");
        let result = document.getElementById('count')
        
        const ODBRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                size: 6,
                color: [0, 255, 255],
                outline: null
            }
        };
/* 
        const FiberRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-line", // autocasts as new SimpleLineSymbol()
                width: "2px",
                color: [0, 255, 255],
                outline: null
            }
        };
*/

        // *********** ODB Query ***************
            let queryodb;
                let odburl = "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1";
            
            let ODB = new FeatureLayer({
                url: odburl,
                title: 'ODB/DC',
                //renderer: ODBRenderer,
                listMode: "hide",
                legendEnabled: false,
            })
            //console.log(ODB)
            map.add(ODB)

            let queryTask = new QueryTask({
                url: odburl
            });


            var resultsLayer = new GraphicsLayer({
                listMode: "hide"
            });
            map.add(resultsLayer)

            view.when(() => {
                return ODB.when(function () {
                    var query = ODB.createQuery();
                    return ODB.queryFeatures(query);
                })

            })
            .then(getValues)
            .then(getUniqueValues)
            .then(addToSelect)

            function getValues(response) {
                var features = response.features;
                var values = features.map((feature, index) => {
                    return feature.attributes.POP;
                });
                return values;
            }

            function getUniqueValues(values) {
                var uniqueValues = [];

                values.map((item, i) => {
                    if (
                        (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
                        item !== ""
                    ) {
                        uniqueValues.push(item);
                    }
                    return item
                });
                return uniqueValues;
            }

            function addToSelect(values) {
                values.sort();
                values.map((value, index) => {
                    var option = document.createElement("option");
                    option.text = value;
                    OdbfromPOP.add(option);
                    
                    return value
                });
                
                return setODBExpression(OdbfromPOP.value);
            }

            function setODBExpression(newValue) {
                
                ODB.definitionExpression = "POP = '" + newValue + "'";

                 queryodb = new Query({
                    returnGeometry: true,
                     outFields: ["Name", "ID", "Placement", "Comment", "POP", "Splitter"],
                     outSpatialReference: { wkid: 4326 },
                    where: ODB.definitionExpression
                    
                })
                ODB.queryFeatures(queryodb).then(function (results) {
                    const features = results.features;
                    view.goTo({
                        target: [features[0].geometry],
                        zoom: 14
                    });
                })

                queryTask.executeForCount(queryodb).then(function (results) {
                    result.innerHTML = " Records : " + results;
                                    
                });
                
            }

            OdbfromPOP.addEventListener("change", function (event) {
                document.getElementById('pop').innerHTML = event.target.value

                let btn = document.getElementById('query-button');    
                    btn.addEventListener('click', () => { 
                        _this.props.height('90vh', '0vh')
                        let type = event.target.value;    
                        setODBExpression(type)              
                      if (event.target.value === " ") {
                          _this.props.height('90vh', '0vh');
                          view.graphics.removeAll()
                      }
                    })                
            });
            document.getElementById('table').addEventListener('click', () => {
                if (OdbfromPOP.value !== " ") {
                    _this.props.height('60vh', '30vh') 
                }
                   
                queryTask.execute(queryodb).then(function (response) {

                    queryTask.executeForCount(queryodb).then(function (results) {
                        result.innerHTML = " Selected ODBs : " + results;

                    });

                    attribute.innerHTML = ""

                    var table = document.createElement("table");
                    table.setAttribute('id', 'table')
                    var header = document.createElement("tr");
                    header.setAttribute('id', 'header-tr')
                    table.appendChild(header);

                    response.fields.forEach(element => {
                        var column = document.createElement("th");
                        column.setAttribute('id', 'table-header')
                        column.textContent = element.alias;
                        header.appendChild(column);
                     
                    });

                    response.features.forEach(res => {
                     console.log(res)
                        var row = document.createElement("tr");
                        table.appendChild(row);

                        response.fields.forEach(e => {
                         
                            var columns = document.createElement("td");
                            columns.addEventListener('click', () =>{
                              
                                view.goTo({
                                    target: [res.geometry],
                                    zoom: 18
                                });
                                view.graphics.removeAll()
                                 g = new Graphic({
                                    geometry: res.geometry,
                                    symbol: {
                                        type: "simple-marker",
                                        size: 7,
                                        color: [227, 241, 18],
                                        outline: null
                                    }
                                })

                                view.graphics.add(g)
                            })
                            columns.textContent = res.attributes[e.name];
                            row.appendChild(columns);

                        })

                    })
                    attribute.appendChild(table);

                });
            })
            /* document.getElementById('cancel').addEventListener('click', () => {
                return _this.props.height('90vh', '0vh'),
                    result.innerHTML = ""
                    //resultsLayer.removeAll();
            }) */
            
    })

}
    
    
    render(){
        return (
            <div>
                <div id="infoDiv">

                    SELECT * FROM DC_ODB WHERE:
                    <div> <strong>POP = <span id="pop"></span></strong></div>
                    <select id="odb-type">
                        <option value = " " >...Unselect ODBs...</option>
                    </select><br />

                    <div id = 'buttons'>
                        <button id="query-button"> Query</button><br />
                        <button id="table"><i className="fas fa-table"></i></button>
                        {/* <button id="cancel"><i className="fas fa-backspace"></i></button><br /> */}
                    </div><br />
                    
                    {/* <div id="results"></div> */}
                    <div id="textArea" style={{display:"none"}}></div>
                    
                    
                </div>
                
            </div>
        )
    }
}
