sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	var uID = null;
	var eID = "";
	var userRole = null;

	return BaseController.extend("eventManagementEVA.controller.aDashboard", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("aDashboard").attachMatched(this.onRouteMatched, this);
		},

		onRouteMatched: function(oEvent) {
			uID = oEvent.getParameter("arguments").userID;
			console.log(uID);
			var oView = this.getView();
			userRole = oEvent.getParameter("arguments").uRole;
			console.log("User role in aDashboard is: " + userRole);
			var createEventBtn = oView.byId("createEventBtn");
			if(userRole === "true"){
			createEventBtn.setVisible(true);
			}
			
			//	var oUserModel = this.getOwnerComponent().getModel("userModel");
			//	console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			this.getView().bindElement("/UserSet('" + uID + "')");
		},
		handlePress: function(oEvent) {
			eID = oEvent.getSource().getBindingContext().getObject().IdEvent;
			console.log("Event ID-ul este : " + eID);
			this.getRouter().navTo("aEvent", {
				eventID: eID,
				userID: uID,
				uRole : userRole
			});
		},
		onCreatePress: function(oEvent) {
			this.getRouter().navTo("createEvent");
		}

	});
});