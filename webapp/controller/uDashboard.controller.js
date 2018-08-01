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
			console.log(uID);
			var oUserModel = this.getOwnerComponent().getModel("userModel");
			console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			this.getView().bindElement("/UserSet('" + uID + "')");

		},

		handlePress: function() {
			this.getRouter().navTo("uEvent"

				, {

					userID: uID

				});
		}
	});
});