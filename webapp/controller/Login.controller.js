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

			oModel.read("/UserSet(IdUser='" + uid + "',Password='" + pasw + "')", {
				success: function(oCompleteEntry) { 
					console.log("Very nice!"); 
					
				},
				error: function(oError) {
					console.log("Not very nice!");
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


		onListItemPress: function(oEvent) {
			var oListItem = oEvent.getSource();
			var oBindingContext = oListItem.getBindingContext();
			var resumeId = oBindingContext.getObject().Resumeid;
		},

		adminDashboard: function() {
			this.getRouter().navTo("aDashboard");
		},
		userDashboard: function() {
			this.getRouter().navTo("uDashboard");
		},
		onUEventTap: function() {
			this.getRouter().navTo("uEvent");
		}

	});

});