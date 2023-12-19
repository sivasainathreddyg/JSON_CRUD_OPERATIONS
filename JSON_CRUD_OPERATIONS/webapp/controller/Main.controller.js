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
                 //student
                this.gistudentid=0;
                this.gArray = [];
                this.sArray= [];
                this.student={
                    id:this.gistudentid,
                    SerialNumber:"",
                    StudentName:"",
                    ContactNumber:"",
                    Math_A_Marks:"",
                    Math_B_Marks:"",
                    Physics_Marks:"",
                    English_Marks:"",
                    SelectedIndex: -1,
                    SelectedIndex2:-1,

                };
                this.data={
                    students:[],
                    student:this.student
                };
                var oModel = new sap.ui.model.json.JSONModel({
                    isSubmitEnabled: false
                });
                this.getView().setModel(oModel);

               
            },
            onSerialNumberChange:function(oEvent){
                var oserial=oEvent.getParameter("value")
                var aExistingSerialNumbers = this.getView().getModel().getProperty("/students").map(function (oStudent) {
                    return oStudent.SerialNumber;
                });
                
            
                var bButtonEnabled = !aExistingSerialNumbers.includes(oserial);
                // this.getView().getModel().setProperty("/isSubmitEnabled", bButtonEnabled);
                var oFragmentModel = this.newstudentDialog.getModel();
                oFragmentModel.setProperty("/isSubmitEnabled", bButtonEnabled);

                // if (aExistingSerialNumbers.includes(oserial)) {
                //     sap.m.MessageBox.error("Serial number must be unique.");
                    
                // }
            },
            
            onSearch: function (oEvent) {
                // add filter for search
                var aFilters = [];
                var sQuery = oEvent.getSource().getValue();
                var oSerialNumberFilter = new sap.ui.model.Filter("SerialNumber", sap.ui.model.FilterOperator.Contains, sQuery);
                var oStudentNameFilter = new sap.ui.model.Filter("StudentName", sap.ui.model.FilterOperator.Contains, sQuery);
            
                if (sQuery && sQuery.length > 0) {
                    var filter = new sap.ui.model.Filter({filters: [oSerialNumberFilter, oStudentNameFilter]}, sap.ui.model.FilterOperator.Contains, sQuery);
                        aFilters.push(filter);
                }// update list binding
                var oList = this.byId("studentsTable");
                var oBinding = oList.getBinding("items");
                oBinding.filter(aFilters, "Application");
            },
          
            
            DetletRows: function () {
                var oTable = this.byId("studentsTable");
                var oModel = this.getView().getModel();
            
                // Get all selected items
                var aSelectedItems = oTable.getSelectedItems();
            
                if (aSelectedItems.length > 0) {
                    // Get the paths of the selected items
                    var aSelectedPaths = aSelectedItems.map(function (oSelectedItem) {
                        return oSelectedItem.getBindingContext().getPath();
                    });
            
                    // Get the current data from the model
                    var aData = oModel.getProperty("/students");
            
                    // Remove the selected items from the data
                    aSelectedPaths.forEach(function (sPath) {
                        var iIndex = parseInt(sPath.split("/")[2], 10);
                        aData.splice(iIndex, 1);
                    });
            
                    // Set the updated data back to the model
                    // oModel.setProperty("/students", aData);
            
                    // Optionally, refresh the model after removing items
                    oModel.refresh();
                } else {
                    sap.m.MessageToast.show("No rows selected to delete");
                }
            },
            
            
            
            
            // onLiveChange: function(oEvent) {
            //     var sSearchValue = oEvent.getParameter("value");
            //     var oTable = this.byId("studentsTable");
            //     var oBinding = oTable.getBinding("items");
            
            //     if (sSearchValue) {
            //         oBinding.filter(new sap.ui.model.Filter("SerialNumber", sap.ui.model.FilterOperator.EQ, sSearchValue));
            //     } else {
            //         oBinding.filter([]);
            //     }
            // },
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
                // console.log("Model Data:", oModel.getData());

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
            // EditStudent:function(oEvent){
            //     var oCurrentvalue=oEvent.getSource().getBindingContext().getObject();
            //     this.newstudentDialog.getModel().setData(oCurrentvalue);
            //     this.newstudentDialog.open();
            //     sap.ui.getCore().byId("fragmentSubmitButtonID").setText("Update");
            //     // sap.ui.getCore().push({ID:fragmentSerialinput,editable:false})
            //     //oModel.push({ID:id,editable:true});

            //     this.gbEditing=true;

            // },
            EditStudent: function (oEvent) {
                var oCurrentvalue = oEvent.getSource().getBindingContext().getObject();
                this.newstudentDialog.getModel().setData(oCurrentvalue);
            
                // Set editMode property to true
                var oViewModel = this.newstudentDialog.getModel();
                oViewModel.setProperty("/editMode", true);
            
                this.newstudentDialog.open();
                sap.ui.getCore().byId("fragmentSubmitButtonID").setText("Update");
            
                this.gbEditing = true;
            },
            
            oncancel:function(){
                this.newstudentDialog.close()
            },
            onSubmit: function (oEvent) {
                var oModel = oEvent.getSource().getModel();
                var oDialogData = oModel.getData();

                if(!oDialogData.SerialNumber){
                    sap.m.MessageBox.error("please enter valid serial number")
                    return;
                }

                

                if (!oDialogData.StudentName) {
                    sap.m.MessageBox.error("Please enter a student name.");
                    return; 
                }

                if (!/^\d{10}$/.test(oDialogData.ContactNumber)) {
                    sap.m.MessageBox.error("Please enter a 10-digit numeric contact number.");
                    return; 
                }
                var mathAMarks = oDialogData.Math_A_Marks.toUpperCase(); 
                if (!((isNaN(mathAMarks) && mathAMarks === 'A') || (parseFloat(mathAMarks) >= 0 && parseFloat(mathAMarks) <= 100))) {
                    sap.m.MessageBox.error("Please enter a valid Math A Marks (either a number between 0 and 100 or 'A').");
                    return; 
                }
                var mathBMarks = oDialogData.Math_B_Marks.toUpperCase(); 
                if (!((isNaN(mathBMarks) && mathBMarks === 'A') || (parseFloat(mathBMarks) >= 0 && parseFloat(mathBMarks) <= 100))) {
                    sap.m.MessageBox.error("Please enter a valid Math B Marks (either a number between 0 and 100 or 'A').");
                    return; 
                }
                var physic = oDialogData.Physics_Marks.toUpperCase(); 
                if (!((isNaN(physic) && physic === 'A') || (parseFloat(physic) >= 0 && parseFloat(physic) <= 100))) {
                    sap.m.MessageBox.error("Please enter a valid Physic Marks (either a number between 0 and 100 or 'A').");
                    return; 
                }
                var english = oDialogData.English_Marks.toUpperCase(); 
                if (!((isNaN(english) && english === 'A') || (parseFloat(english) >= 0 && parseFloat(english) <= 100))) {
                    sap.m.MessageBox.error("Please enter a valid English Marks (either a number between 0 and 100 or 'A').");
                    return; 
                }


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
                
                if(oDialogData.SelectedIndex===1){
                    oDialogData.Gender="Female";
                   
                }
                else{
                    oDialogData.Gender="Male";
                }  
                if (this.gArray.filter(a=>a.Key === oDialogData.Gender).length === 0 || this.gArray.length === 0) {
                this.gArray.push({'Key' : oDialogData.Gender, 'Gender' : oDialogData.Gender});
                }
                var jsoon = new sap.ui.model.json.JSONModel(this.gArray);
                this.getView().byId("genderComboBox").setModel(jsoon);
                
                if (oDialogData.SelectedIndex2 === 1) {
                    oDialogData.Status = "Fail";
                } else {
                    oDialogData.Status = "pass";
                }
                if (this.sArray.filter(a=>a.Key === oDialogData.Status).length === 0 || this.sArray.length === 0) {
                    this.sArray.push({'Key' : oDialogData.Status, 'Status' : oDialogData.Status});
                    }
                    var jsooon = new sap.ui.model.json.JSONModel(this.sArray);
                    this.getView().byId("genderComboBox1").setModel(jsooon);
            
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
                this.getView().getModel().setData(oViewData);
              
            },
            // onComboBoxSelectionChange: function (oEvent) {
            //     // Get the selected item key
            //     var cFilter=[];
            //     var sSelectedGender =  oEvent.getSource().getValue();
    
            //     // Create a filter based on the selected gender
            //     var oFilter = new sap.ui.model.Filter("Gender", sap.ui.model.FilterOperator.StartsWith, sSelectedGender);
            //     cFilter.push(oFilter)
    
            //     // Update list binding
            //     var oList = this.byId("studentsTable");
            // var oBinding = oList.getBinding("items");
            // oBinding.filter(cFilter, "Application");
            // },
            // onComboBoxSelectionChange:function(oEvent){
            //     var sFilter=[];
            //     var cSelectedStatus=oEvent.getSource().getValue();
            //     var dFilter=new sap.ui.model.Filter("Status",sap.ui.model.FilterOperator.StartsWith,cSelectedStatus);
            //     sFilter.push(dFilter)
                 
            //     var oList = this.byId("studentsTable");
            //     var oBinding = oList.getBinding("items");
            //     oBinding.filter(sFilter, "Application");
            // },
            onSearch: function () {
                var comboBox1 = this.byId("genderComboBox");
                var comboBox2 = this.byId("genderComboBox1");
            
                var selectedValue1 = comboBox1.getSelectedKey();
                var selectedValue2 = comboBox2.getSelectedKey();
            
                // Create filters for ComboBox1 and ComboBox2
                var filter1 = new sap.ui.model.Filter("Gender", sap.ui.model.FilterOperator.EQ, selectedValue1);
                var filter2 = new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, selectedValue2);
            
                // Combine filters using the AND operator
                var combinedFilter = new sap.ui.model.Filter([filter1, filter2], true);
            
                // Apply the combined filter to your list or table binding
                var list = this.byId("studentsTable");
                var binding = list.getBinding("items");
                binding.filter(combinedFilter,"Application");
            },
            
            // OnNavigation:function(){
            //     sap.m.MessageToast.show("navigation");
            //     var oRouter=sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.navTo("RouteNavigation");
            //     var oTable=this.byId("studentsTable");
            //     var oModel=this.getView().getModel();

            //     var selectedrow=oTable.getSelectedItems();

            //     if(selectedrow>0){
                    
            //     }

            //     var aData = oModel.getProperty("/students");
            //     var first=aData[0]['id']
            //     this.getView().byId("SerialNo").setValue(first)

                
            // },

            OnNavigation: function(oEvent) {
                var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
                var oSelectedItem = oEvent.getSource().getBindingContext().getObject();
                oRouter.navTo("RouteNavigation",{
                    "data": JSON.stringify(oSelectedItem)
                    // JSON.stringify({
                    // "SerialNo":oSelectedItem.SerialNumber,
                    // "StudentName":oSelectedItem.StudentName,
                    // "ContactNo":oSelectedItem.ContactNumber,
                    // "Math_A_Marks":oSelectedItem.Math_A_Marks,
                    // "Math_B_Marks":oSelectedItem.Math_B_Marks,
                    // "Pyhsic_Marks":oSelectedItem.Physics_Marks,
                    // "English_Marks":oSelectedItem.English_Marks
                    // })
                    
                });
            },

            
            // onInit: function() {
            //     var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //     oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);
            // },
            
            // _onObjectMatched: function(oEvent) {
            //     var sId = oEvent.getParameter("arguments").id;
            //     // Now you have the 'id' parameter, use it to fetch data and set it to your form
            //     this.loadDataForForm(sId);
            // },
            
            
            onbutton:function(){
                sap.m.MessageToast.show(" controller work  ");
               this.getView().byId("SerialNo").setValue("sai");
            }
           
                
            // onRadioButtonSelected: function (oEvent) {
            //     var oRadioButtonGroup = this.byId("myRadioButtonGroup");
            //     var sSelectedKey = oRadioButtonGroup.getSelectedButton().getText();
            //     console.log("Selected RadioButton: " + sSelectedKey);
            // }
            

            
            
            
        });
    });
