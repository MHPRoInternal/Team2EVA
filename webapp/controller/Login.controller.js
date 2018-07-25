sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.Login", {

		adminDashboard: function() {
			this.getRouter().navTo("aDashboard");
		},
		userDashboard: function() {
			this.getRouter().navTo("uDashboard");
		},
		onSavePress: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			oModel.setUseBatch("true");
			oModel.submitChanges({
				success: jQuery.proxy(function() {
					new sap.m.MessageToast.show("Changes successfully saved!");
				}, this),
				error: jQuery.proxy(function() {
					oModel.setUseBatch(false);
					new sap.m.MessageToast.show("Error saving changes!");

				}, this)
			});
		}
	});

});