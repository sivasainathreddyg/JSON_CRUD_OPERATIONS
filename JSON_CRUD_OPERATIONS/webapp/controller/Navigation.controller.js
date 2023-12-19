sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Text",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Text,Fragment) {
        "use strict";

        return Controller.extend("com.demo.project3.controller.Navigation", {
             onInit: function() {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                oRouter.getRoute("RouteNavigation").attachPatternMatched(this._onObjectMatched, this);
            },
            
            _onObjectMatched: function(oEvent) {
                    var oArgs = oEvent.getParameter("arguments");
                    var oData = JSON.parse(oArgs.data);
                var jsonModel = new sap.ui.model.json.JSONModel();
                jsonModel.setData(oData);
                this.getView().byId("idForm").setModel(jsonModel, "formModel");
                    // Now, oData contains all the properties
                    // Set these values in your form fields
                    // this.getView().byId("SerialNo").setText(oData.SerialNo);
                    // this.getView().byId("StudentName").setText(oData.StudentName);
                    // this.getView().byId("ContactNo").setText(oData.ContactNo);
                    // this.getView().byId("Math_A_Marks").setText(oData.Math_A_Marks);
                    // this.getView().byId("Math_B_Marks").setText(oData.Math_B_Marks);
                    // this.getView().byId("Pyhsic_Marks").setText(oData.Pyhsic_Marks);
                    // this.getView().byId("English_Marks").setText(oData.English_Marks);
                }


            
            //}
        });
    });
    