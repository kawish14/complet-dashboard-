import React from 'react';
import { loadModules, setDefaultOptions } from 'esri-loader';

setDefaultOptions({ version: '4.14' })
export default class SpatialQuery extends React.Component{
    componentDidMount(){
        let _this = this
        let map = this.props.map;
        let view = this.props.view;

        loadModules(["esri/layers/FeatureLayer", "esri/tasks/support/Query", "esri/tasks/QueryTask", "esri/layers/GraphicsLayer", 
            "esri/geometry/geometryEngine", "esri/Graphic", 'esri/widgets/Expand', "esri/geometry/Extent",
            "esri/tasks/support/LengthsParameters"
        ], { css: false })
            .then(([FeatureLayer, Query, QueryTask, GraphicsLayer, geometryEngine, Graphic, Expand, Extent, LengthsParameters]) => {

        view.ui.add(
            [
                new Expand({
                    view: view,
                    content: document.getElementById("infoDiv1"),
                    group: "bottom-right",
                    expanded: false,
                    expandIconClass: "fas fa-object-group", 
                })
            ],
            "top-right"
        );
        var DCurl =
            "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/1";

        var customerurl =
            "http://localhost:6080/arcgis/rest/services/KarachiSDE/FeatureServer/5";

        let TownBuffer, districtGeometries, queryCustomer, queryDC,  g

        var district = document.getElementById("Town");
        var distanceSlider = document.getElementById("distance");
        var queryDCButton = document.getElementById("query-DC");
        var querycustomerButton = document.getElementById('query-customer');
        let result = document.getElementById('count');
        let attribute = document.getElementById('attribute')

        var districtlayer = new FeatureLayer({
            url: "http://localhost:6080/arcgis/rest/services/South_Region/South_Region_for_server/MapServer/1",
            outFields: ["*"],
            visible: false,
            legendEnabled: false,
            listMode: "hide"
        });
        map.add(districtlayer)


        const ODBRenderer = {
            type: "simple", // autocasts as new SimpleRenderer()
            symbol: {
                type: "simple-marker", // autocasts as new SimpleMarkerSymbol()
                size: 8,
                color: [0, 255, 255],
                outline: null
            }
        };

        var DC = new FeatureLayer({              
            url: DCurl,
            outFields: ["*"],
            visible: false,
            listMode: "hide",
            legendEnabled: false,
            renderer: ODBRenderer,
        });
        map.add(DC)

        var customer = new FeatureLayer({
            url: customerurl,
            outFields: ["*"],
            visible: false,
            listMode: "hide"
        });
        map.add(customer)

        let queryTaskDC = new QueryTask({
            url: DCurl
        });

        let queryTaskcustomer = new QueryTask({
            url: customerurl
        });

        var resultsLayer = new GraphicsLayer({
            listMode: "hide"
        });
        map.add(resultsLayer)

        view.ui.add("infoDiv1", "top-left");
        

        view.when(function () {
            return districtlayer.when(function () {
                var query = districtlayer.createQuery();
                return districtlayer.queryFeatures(query);
            });
        })
        .then(getValues)
        .then(getUniqueValues)
        .then(addToSelect)
        .then(createBuffer);

        function getValues(response) {
            var features = response.features;
            var values = features.map(function (feature) {
                return feature.attributes.TOWN_NAME;
            });
            return values;
        }

        function getUniqueValues(values) {
            var uniqueValues = [];

            values.forEach(function (item, i) {
                if (
                    (uniqueValues.length < 1 || uniqueValues.indexOf(item) === -1) &&
                    item !== ""
                ) {
                    uniqueValues.push(item);
                }
            });
            return uniqueValues;
        }

        function addToSelect(values) {
            values.sort();
            values.map((value, index) => {
                var option = document.createElement("option");
                option.text = value;
                district.add(option);

                return value
            });

            return setWellsDefinitionExpression(district.value);
        }

        function setWellsDefinitionExpression(newValue) {
            districtlayer.definitionExpression = "TOWN_NAME = '" + newValue + "'";

            let queryodb = new Query({
                returnGeometry: true,
                outSpatialReference: { wkid: 4326 },
                where: districtlayer.definitionExpression

            });
            districtlayer.queryFeatures(queryodb).then(function (results) {
                const features = results.features;
                view.goTo({
                    target: [features[0].geometry],
                    zoom: 13
                });
            })

            if (!districtlayer.visible) {
                districtlayer.visible = true;
            }
            
            return queryForWellGeometries();
        }

        function queryForWellGeometries() {
            var districtQuery = districtlayer.createQuery();

            return districtlayer.queryFeatures(districtQuery).then(function (response) {
                districtGeometries = response.features.map(function (feature) {
                    return feature.geometry;
                });

                return districtGeometries;
            });
        }

        function createBuffer(Points) {
            var bufferDistance = parseInt(distanceSlider.value);
            var districtBuffer = geometryEngine.geodesicBuffer(
                Points,
                [bufferDistance],
                "meters",
                true
            );
            TownBuffer = districtBuffer[0];

            // add the buffer to the view as a graphic
            var bufferGraphic = new Graphic({
                geometry: TownBuffer,
                symbol: {
                    type: "simple-fill", // autocasts as new SimpleFillSymbol()
                    outline: {
                        width: 2,
                        color: [0, 255, 255, 1]
                    },
                    style: "none"
                }
            });
            view.graphics.removeAll();
            view.graphics.add(bufferGraphic);
        }


        district.addEventListener("change", function (event) {
            let type = event.target.value;
            setWellsDefinitionExpression(type).then(createBuffer);
            
        });

        queryDCButton.addEventListener("click", function () {
            queryDCtotal().then(displayDCstotal); 
        });

        querycustomerButton.addEventListener("click", function () {
            queryCustomertotal()
            .then(displayCustomertotal)

        });
        

        function queryDCtotal() {
            queryDC = DC.createQuery();
            queryDC.where = "1=1 ";
            queryDC.geometry = TownBuffer;
            queryDC.outFields = ["Name", "ID", "Placement", "Comment", "POP", "Splitter"];
            queryDC.spatialRelationship = "intersects";

            queryTaskDC.execute(queryDC).then(function (response) {

                attribute.innerHTML = ""

                var table = document.createElement("table");
                var header = document.createElement("tr");
                table.appendChild(header);

                response.fields.forEach(element => {
                    var column = document.createElement("th");
                    column.textContent = element.alias;
                    header.appendChild(column);
                    //alert(element.fields.alias);
                });

                response.features.forEach(res => {
                    var row = document.createElement("tr");
                    table.appendChild(row);


                    response.fields.forEach(e => {
                        //console.log(response.fields[i])    
                        var columns = document.createElement("td");
                        columns.addEventListener('click', () => {

                            view.goTo({
                                target: [res.geometry],
                                zoom: 18
                            });
                            view.graphics.removeAll()
                             g = new Graphic({
                                geometry: res.geometry,
                                symbol: {
                                    type: "simple-marker",
                                    size: 6,
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
            
            _this.props.height('60vh', '30vh') 
            return DC.queryFeatures(queryDC)

        }

        function displayDCstotal(results) {
            resultsLayer.removeAll();
        
            var features = results.features.map(function (graphic) {
                graphic.symbol = {
                    type: "simple-marker",
                    size: 8,
                    color: [0, 255, 255],
                    outline: null
                };
                return graphic;
            });

            /*  var numCrime = features.length;
                document.getElementById("results").innerHTML = " Total Crimes are " + numCrime;*/
            resultsLayer.addMany(features);

            let querytotal = new Query({
                returnGeometry: true,
                geometry: TownBuffer,
                outFields: ["*"],
                where: "1=1 ",
                spatialRelationship: "intersects"
            })

            queryTaskDC.executeForCount(querytotal).then(function (results) {
                result.innerHTML = " DC/ODB Count: " + results;
            });
        }

            function queryCustomertotal() {
                queryCustomer = customer.createQuery();
                queryCustomer.where = "1=1 ";
                queryCustomer.outFields = ["Name", "ID", "FAT", "DC", "Type", "Comments"];
                queryCustomer.geometry = TownBuffer;
                queryCustomer.spatialRelationship = "intersects";  


                queryTaskcustomer.execute(queryCustomer).then(function (response) {

                    attribute.innerHTML = ""
    
                    var table = document.createElement("table");
                    var header = document.createElement("tr");
                    table.appendChild(header);

                    response.fields.forEach(element => {
                        var column = document.createElement("th");
                        column.textContent = element.alias;
                        header.appendChild(column);
                        //alert(element.fields.alias);
                    });

                    response.features.forEach(res => {
                        var row = document.createElement("tr");
                        table.appendChild(row);


                        response.fields.forEach(e => {
                            //console.log(response.fields[i])    
                            var columns = document.createElement("td");
                            columns.addEventListener('click', () => {
                                
                                var textSymbol = {
                                    type: "text",  // autocasts as new TextSymbol()
                                    color: "white",
                                    haloColor: "black",
                                    haloSize: 2,
                                     text: res.attributes.Name, 
                                    xoffset: 3,
                                    yoffset: 3,
                                    font: {  // autocasts as new Font()
                                        size: 8,
                                        family: "sans-serif",
                                        weight: "bold"
                                    }
                                }

                                view.goTo({
                                    target: [res.geometry],
                                    zoom: 18
                                });

                                view.graphics.removeAll()

                               let g = new Graphic({
                                   geometry: res.geometry,
                                   symbol:{
                                       type: "simple-marker",
                                       size: 6,
                                       color: [227, 241, 18],
                                       outline: null
                                   }
                               })
                                let textGraphic = new Graphic({
                                    geometry: res.geometry,
                                    symbol: textSymbol
                                })
                                view.graphics.add(textGraphic)
                                view.graphics.add(g)
                            })
                            columns.textContent = res.attributes[e.name];
                            row.appendChild(columns);

                        })

                    })
                    attribute.appendChild(table);

                });
         
                _this.props.height('60vh', '30vh') 

                return customer.queryFeatures(queryCustomer)

                

            }

            function displayCustomertotal(results) {
                
                resultsLayer.removeAll();
                var features = results.features.map(function (graphic) {
            
                  
                    graphic.symbol = {
                        type: "simple-marker",
                        size: 5,
                        color: [0, 255, 255],
                        outline: null
                    };
        
                    return graphic;
                });

                /*  var numCrime = features.length;
                  document.getElementById("results").innerHTML = " Total Crimes are " + numCrime;*/
                resultsLayer.addMany(features);

                let querytotal = new Query({
                    returnGeometry: true,
                    geometry: TownBuffer,
                    outFields: ["*"],
                    where: "1=1 ",
                    spatialRelationship: "intersects"
                })
                
                queryTaskcustomer.executeForCount(querytotal).then(function (results) {
                    result.innerHTML = " Customer Count: " + results;
                });

            }
        
            let unselect = document.getElementById('unselect');
            unselect.addEventListener('click', () => {
                 _this.props.height('90vh', '0vh')
                    result.innerHTML = ""
                    resultsLayer.removeAll()
                    view.graphics.removeAll()
                
            })

        })
        window.$("[id$=myButtonControlID]").click(function (e) {
            window.open('data:application/vnd.ms-excel,' + encodeURIComponent(window.$('div[id$=attribute]').html()));
            e.preventDefault();
        });
    }
    

    render(){
        return (
            <div>
                <div id="infoDiv1">
                    <strong>Select Town</strong>
                    <select id="Town">
                        <option value=" ">...Uselect Result...</option>
                    </select>
                    {/* <button id = 'query-button1'> Town Result</button>  */}
                    <br />
                    <input
                        id="distance"
                        type="range"
                        min="0"
                        max="0"
                        step="5"
                        defaultValue="100"
                    />
                    <strong>Click Target layer</strong>
                <div id="buttons">
                        <button id="query-DC"><i className="fas fa-columns"></i> DC/ODB</button> <br />
                        <button id="query-customer"><i className="fas fa-columns"></i>Customer</button> <br />
                    </div><br />
                    <button id="unselect">Clear Selection of Target Layer</button> <br />

                   {/*  <div id="results1"></div><br /> */}
                    <button id="myButtonControlID">Export to Excel</button>   

                </div>
                <div id="attribute"></div>
            </div>           

        )
    }
}