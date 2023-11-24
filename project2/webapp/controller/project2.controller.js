sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],  
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function(Controller,JSONModel) {
        "use strict";

        return Controller.extend("project2.controller.project2", {
            onInit: function () {
                // var data={
                //     "EmployeeDetails":[
                //     {
                //         "firstname":"A",
                //         "lastname":"D",
                //         "salary":40000,
                //         "Desigination":"IT"
                //     }]
                // };

                var EmployeeDetails = [
                    {
                        "firstname":"A",
                        "lastname":"D",
                        "salary":40000,
                        "Desigination":"IT"
                    }];

                // var oModel=new sap.ui.model.json.jsonModel(data);
                // this.getView().setModel(oModel,"tablemodel");

                var oModel=new JSONModel();
                oModel.setData({"hhh":EmployeeDetails});
                // this.getView().setModel(oModel,"tableMod");
                oModel.setProperty("/newProp", 10000);
                this.getView().setModel(oModel);
                this._i18nResource = new sap.ui.model.resource.ResourceModel({
                      bundleName: "project2.i18n.i18n"
            
                        }).getResourceBundle();
            },
            // onBeforeRendering : function(){
            //     alert("onBeforeRendering")
            // },
            // onAfterRendering : function(){
            //    alert("onAfterRendering")
            // },
            // onExit : function(){
            //     alert("onExit")
            // }
            // onDelete:function(){
            //     var oEvent=new
            // }
        });
    });
