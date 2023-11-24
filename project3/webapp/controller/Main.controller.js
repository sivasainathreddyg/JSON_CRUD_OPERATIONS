sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Fragment) {
        "use strict";

        return Controller.extend("com.demo.project3.controller.Main", {
            onInit: function () {

                this.gistudentid=0
                this.student={
                    id:this.gistudentid,
                    SerialNumber:"",
                    StudentName:"",
                    ContactNumber:"",
                    Math_A_Marks:"",
                    Math_B_Marks:"",
                    Physics_Marks:"",
                    English_Marks:""

                };
                this.data={
                    students:[],
                    student:this.student
                };
  
            },
            onLiveChange: function(oEvent) {
                var sSearchValue = oEvent.getParameter("value");
                var oTable = this.byId("studentsTable");
                var oBinding = oTable.getBinding("items");
            
                if (sSearchValue) {
                    oBinding.filter(new sap.ui.model.Filter("SerialNumber", sap.ui.model.FilterOperator.EQ, sSearchValue));
                } else {
                    oBinding.filter([]);
                }
            },
            // ongetdetails:function(){
            //     var oview=this.getView();
            //     var oserianumber=oview.byId("serialNumberInput").getValue();

            //     var students=oview.getModel().getProperty("/students");

            //     var studentfilter=students.filter(function(student){
            //         return student.SerialNumber===oserianumber
            //     });
            //     if(studentfilter.length>0){
            //         oview.getModel().setProperty("/students",studentfilter);
            //     }else{
            //         sap.m.MessageBox.error("No Student Found to the Serial Number");
            //     }

            // },
            onAfterRendering:function(){
                var oModel=new sap.ui.model.json.JSONModel(this.data);
                this.getView().setModel(oModel)
                console.log("Model Data:", oModel.getData());

            },
            addstudent:function(oEvent){
                
                if(!this.newstudentDialog){
                this.newstudentDialog=sap.ui.xmlfragment("com.demo.project3.fragments.simpleFragment",this);
                var oModel=new sap.ui.model.json.JSONModel();
                this.newstudentDialog.setModel(oModel)
                }
                this.student.id=this.gistudentid;
                var data=JSON.parse(JSON.stringify(this.student))
                this.newstudentDialog.getModel().setData(data);
                this.newstudentDialog.open()

            },
            EditStudent:function(oEvent){
                var oCurrentvalue=oEvent.getSource().getBindingContext().getObject();
                this.newstudentDialog.getModel().setData(oCurrentvalue);
                this.newstudentDialog.open();
                this.gbEditing=true;

            },
            oncancel:function(){
                this.newstudentDialog.close()
            },
            onSubmit: function (oEvent) {
                var oModel = oEvent.getSource().getModel();
                var oDialogData = oModel.getData();
                var oViewData = this.getView().getModel().getData();
                if(this.gbEditing){
                    for( var i=0; i<oViewData.students.length>0; i++){
                        var temp=oViewData.students[i]
                        if(temp.id===oDialogData.id){
                            temp=oDialogData;
                            oViewData.students[i]=temp;
                            break;
                        }
                    }
                    this.gbEditing=false;
                    var oViewData = this.getView().getModel().setData(oViewData)
                    this.newstudentDialog.close();
                    return;

                }
            
                
                oViewData.students.push(oDialogData);
            
    
                this.getView().getModel().setData(oViewData);
                this.gistudentid++;
            
                this.newstudentDialog.close();
            },
            DeleteStudent:function(oEvent){
                var oCurrentstudent=oEvent.getSource().getBindingContext().getObject();
                var oViewData=this.getView().getModel().getData()
                for( var i=0; i<oViewData.students.length>0; i++){
                    var temp=oViewData.students[i]
                    if(temp.id===oCurrentstudent.id){
                        oViewData.students.splice(i,1);
                        break;
                    }

                }
                this.getView().getModel().setData(oViewData)
              
            }
            
            
            
        });
    });
