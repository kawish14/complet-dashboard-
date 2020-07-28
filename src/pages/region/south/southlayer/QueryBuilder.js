import React from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';
import './attributequery.css'

setDefaultOptions({ version: '4.14' })
export default class QueryBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: [],
            loading: true,
            ODB:[],
            queryTask:[],
            resultsLayer:[],
            eventvalue:[],
            layer:[],
            uniqueValueDropDown:[],
            queryInput: ''

        }
        this.selectlayer = React.createRef()
    }

    componentDidMount() {
        let _this = this
        let map = this.props.map;
        let view = this.props.view;

        view.ui.add(this.selectlayer.current, 'top-right')

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


                // *********** ODB Query ***************
             
                let odburl = "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1";

                let ODB = new FeatureLayer({
                    url: odburl,
                    title: 'ODB/DC',
                    //renderer: ODBRenderer,
                    listMode: "hide",
                    legendEnabled: false,
                })
                map.add(ODB)

                let queryTask = new QueryTask({
                    url: odburl
                });
                
                var resultsLayer = new GraphicsLayer({
                    listMode: "hide"
                });
                map.add(resultsLayer)

                _this.setState({
                    ODB: ODB,
                    queryTask: queryTask,
                    resultsLayer:resultsLayer
                })

               /*  function setODBExpression(newValue) {

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

                } */

             /*    OdbfromPOP.addEventListener("change", function (event) {
                    document.getElementById('pop').innerHTML = event.target.value

                    let btn = document.getElementById('query-button');
                    btn.addEventListener('click', () => {
                      
                        let type = event.target.value;
                       // setODBExpression(type)
                        if (event.target.value === " ") {
                    
                            view.graphics.removeAll()
                        }
                    })
                }); */
     

            })

    }

    selectedlayer = (e) => {
        if(e.target.value === "DC_ODB"){
            this.setState({
                eventvalue: e.target.value,
                layer:"POP",
            })
        }
    }


    operations = (e) => {
      this.setState({
          queryInput: e.target.value
      })
        e.preventDefault();
    }

    getUniqueValue = () => {
        let view = this.props.view
        let { ODB } = this.state

        if(this.state.eventvalue === "DC_ODB") {
            view.when(() => {
                return ODB.when(function () {
                    var query = ODB.createQuery();
                    return ODB.queryFeatures(query);
                })

            })
            .then(this.getValues)
            .then(this.getUniqueValues)
            .then(this.addToSelect)

            this.getValues = (response)  => {
                var features = response.features;
                var values = features.map((feature, index) => {
                    return feature.attributes.POP;
                });
                return values;
            }


            this.getUniqueValues = (values) => {
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


            this.addToSelect = (values) => {
                values.sort();
                this.setState({
                    uniqueValueDropDown:values
                })

            }
        }

    }

    queryInput = (e) => {
        this.setState({
            queryInput: e.target.value
        })
        e.preventDefault();
        console.log(this.state.queryInput)
    }

    queryDone = () => {
       
    }

    componentDidUpdate(prevProp, prevState){
        if(prevState === this.state){
            console.log("state Not Change")
        }else {
            console.log("State Change")
        }
    }

    render() {
        const { uniqueValueDropDown, queryInput} = this.state
        return (
            <div>
                <div id="infoDiv">

                    SELECT * FROM DC_ODB WHERE:
                    <div> <strong>POP = <span id="pop"></span></strong></div>
                    <select id="odb-type">
                        <option value=" " >...Unselect ODBs...</option>
                    </select><br />

                    <div id='buttons'>
                        <button id="query-button"> Query</button><br />
                        <button id="table"><i className="fas fa-table"></i></button>
                        {/* <button id="cancel"><i className="fas fa-backspace"></i></button><br /> */}
                    </div><br />

                    {/* <div id="results"></div> */}
                    <div id="textArea" style={{ display: "none" }}></div>


                </div>

                <div ref={this.selectlayer}>
                    <span className="selectlayer">Select Layer</span>
                    <select onChange = {(e) => this.selectedlayer(e)} >
                        <option value="DC_ODB" >DC/ODB</option>
                        <option value="FAT" >FAT</option>
                        <option value="Fiber" >Fiber</option>
                        <option value="customers" >Customers</option>
                    </select>

                    <div>
                        <div onClick={(e) => this.operations(e)}>
                            <button value="=" >=</button>
                            <button value="AND" >AND</button>
                            <button value = "NOT" >NOT</button>
                            <button value = "IN" >IN</button>
                        </div>
                        
                    </div>
                    <button onClick={this.getUniqueValue}>Get Unique_Values</button>

                     <select /* onChange={(e) => this.fieldData(e)} */>
                        {
                            uniqueValueDropDown.map((item, key) => {
                                return <option key={key} className="list-group-item" value={item}> {item} </option>
                                /* if (this.state.uniqueValues.indexOf(item) === key) {
                                    return <option key={key} className="list-group-item" value={item}> {item} </option>
                                } */
                            })
                        }
                    </select> 
                    <input type="text" value={queryInput} onChange={(e) => this.queryInput(e)} />
                    <p type="text" value={queryInput} onChange={(e) => this.queryInput(e)} ></p>
                    <button onClick={this.queryDone}>Query</button>
                </div>
            </div>
        )
    }
}
