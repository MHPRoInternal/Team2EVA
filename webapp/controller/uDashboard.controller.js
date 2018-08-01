sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	"jquery.sap.global",
	"sap/ui/core/Popup",
	"sap/ui/model/Filter",
	"sap/m/Button",
	"sap/m/Image",
	"sap/m/MessageToast"
], function(BaseController, Button, Popup, Image, MessageToast, Filter) {
	"use strict";

	var uID = null;

	return BaseController.extend("eventManagementEVA.controller.uDashboard", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("uDashboard").attachMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function(oEvent) {
			uID = oEvent.getParameter("arguments").userID;
			//console.log(uID);
			var oView = this.getView();
			var oModel = oView.getModel();
			var filters = new Array();
			var filterUser = new sap.ui.model.Filter("IdUser", sap.ui.model.FilterOperator.EQ, uID);
			filters.push(filterUser);

			oModel.read("/EventSet", null, filters, {
				success: function(oCompleteEntry) {

					var oForm = oView.byId("eventList");
					oForm.bindElement("/EventSet");
				}
			});
		},

		handlePress: function() {
			this.getRouter().navTo("uEvent"

				, {

					userID: uID

				});
		}
	});
});