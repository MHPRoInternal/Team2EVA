sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.Login", {

		onLoginTap: function() {
			var oView = this.getView();
			var oModel = oView.getModel();
			var uid = this.getView().byId("uid").getValue();
			var pasw = this.getView().byId("pasw").getValue();
			var route = this.getRouter();

			oModel.read("/UserSet(IdUser='" + uid + "',Password='" + pasw + "')", {
				success: function(oCompleteEntry) {
					if (oCompleteEntry.Role === true) {
						route.navTo("aDashboard");
					} else if(oCompleteEntry.Role === false) {
						route.navTo("uDashboard");
				
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