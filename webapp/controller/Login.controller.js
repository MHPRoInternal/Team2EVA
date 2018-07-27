sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Popup',
	'sap/m/Button'
], function(BaseController, Popup, Button) {
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
				//var loginSuccess = "Login Successful! Welcome, " + uid + ".";
				
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
						console.log("Not very nice!");
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