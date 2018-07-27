sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Popup',
	'sap/m/Button',
	'sap/m/MessageToast'
], function(BaseController, Popup, Button, MessageToast) {
	"use strict";

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
				 //MessageToast.show("Login Successful! Welcome.");
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

			}
			// 	var oModel = new sap.ui.model.odata.v2.ODataModel({
			// 		serviceUrl: "http://services.odata.org/Northwind/Northwind.svc",
			// 		metadataUrlParams: {
			// 			ID_USER: "{uid}",
			// 			PASSWORD: "{pasw}"
			// 		}
			// 	});
			// 
	});

});