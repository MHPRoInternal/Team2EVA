sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";
	
	var uID = null;
	
	return BaseController.extend("eventManagementEVA.controller.aDashboard", {

		onInit: function(oEvent) {
		this.getRouter().getRoute("aDashboard").attachMatched(this.onRouteMatched, this);
		//this.getRouter().getRoute("createEvent").attachMatched(this.onRouteMatched, this);
		},
		
		onRouteMatched: function(oEvent) {
			uID = oEvent.getParameter("arguments").userID;
			console.log(uID);
			//var oUserModel = this.getOwnerComponent().getModel("userModel");
			//console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			this.getView().bindElement("/UserSet('" + uID + "')");
		},
		handlePress: function(oEvent) {
			var eID = oEvent.getSource().getBindingContext().getObject().IdEvent;
			console.log("Event ID-ul este : " + eID);
			this.getRouter().navTo("aEvent"

				, {

					eventID: eID

				});
		},
		onCreatePress : function() {
			this.getRouter().navTo("createEvent");
		}

	});
});