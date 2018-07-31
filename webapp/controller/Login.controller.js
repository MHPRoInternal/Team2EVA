sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Popup',
	'sap/m/Button',
	'sap/m/MessageToast',

], function(BaseController, Popup, Button, MessageToast) {
	"use strict";
	
	var oButton2 = new sap.m.Button('', {

                    text: 'Save',

                   tap: [ this.Save, this ]

             });

             var oButton3 = new sap.m.Button("Cancel", {

                    text: "Cancel",

            		 press : function () {
			
			             sap.ui.getCore().byId("Dialog1").close();
			
			    		}  
                    

             });
		var oDialog = new sap.m.Dialog("Dialog1",{

                    title:'Change Password',

                    modal: true,

                    contentWidth:'1em',

                    buttons: [ oButton2, oButton3 ],

             content:[

                      new sap.m.Label({text:'Username'}),

                      new sap.m.Input({

                    maxLength: 20,

                    id: 'Username'

                      }),

                      new sap.m.Label({text:'Password'}),

                      new sap.m.Input({

                   maxLength: 20,

                     id: 'Password'

                       }),

                      new sap.m.Label({text:'New Password'}),

                      new sap.m.Input({

                   maxLength: 3,

                   id: 'NPassword' 

                    }),
                        new sap.m.Label({text:'Comfirm Password'}),

                      new sap.m.Input({

                   maxLength: 3,

                   id: 'CPassword' 

                    })
                    

                      ]

             });
        
   
	return BaseController.extend("eventManagementEVA.controller.Login", {
		
	
				
		onLoginTap: function(oEvent) {
				var oView = this.getView();
				var oModel = oView.getModel();
				var uid = this.getView().byId("uid").getValue();
				var pasw = this.getView().byId("pasw").getValue();
				var route = this.getRouter();
				//var oListItem = oEvent.getSource();
				// var oBindingContext = oListItem.getBindingContext();
				// var userId = oBindingContext.getObject().IdUser;
				// var loginSuccess = "Login Successful! Welcome, " + uid + ".";
				
				// var oPopUp = new Popup({
				// 			modal: true,

				// 			content: new Text({
				// 				text: loginSuccess
				// 			}),
							
				// 			autoclose: true

				// 		});
				// oPopUp.open();
						
				oModel.read("/UserSet(IdUser='" + uid + "',Password='" + pasw + "')", {
					success: function(oCompleteEntry) {
					MessageToast.show("Login Successful! Welcome: " + uid + "." , {
					
						animationDuration: 5000
					
					});
						if (oCompleteEntry.Role === true) {
						
							route.navTo("aDashboard");
							
						} else if (oCompleteEntry.Role === false) {
							
							route.navTo("uDashboard"
							, {
								
								userID: uid
							
							});
							
						}
						
						
					},
					error: function(oError) {
						 MessageToast.show("Invalid credentials!");
						
					}

				});

			},
			// 	var oModel = new sap.ui.model.odata.v2.ODataModel({
			// 		serviceUrl: "http://services.odata.org/Northwind/Northwind.svc",
			// 		metadataUrlParams: {
			// 			ID_USER: "{uid}",
			// 			PASSWORD: "{pasw}"
			// 		}
			// 	});
			// 
			
			NewEntry: function() {

             sap.ui.getCore().byId('Dialog1').open();

       }



	});

});