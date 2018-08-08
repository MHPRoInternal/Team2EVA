sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";
	
	var uID = null;
	var eID = "";
	
	return BaseController.extend("eventManagementEVA.controller.aDashboard", {

		onInit: function(oEvent) {
		this.getRouter().getRoute("aDashboard").attachMatched(this.onRouteMatched, this);
		//this.getRouter().getRoute("createEvent").attachMatched(this.onRouteMatched, this);
		},
		
		onRouteMatched: function(oEvent) {
			uID = oEvent.getParameter("arguments").userID;
			console.log(uID);
		//	var oUserModel = this.getOwnerComponent().getModel("userModel");
		//	console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			this.getView().bindElement("/UserSet('" + uID + "')");
		},
		handlePress: function(oEvent) {
			eID = oEvent.getSource().getBindingContext().getObject().IdEvent;
			console.log("Event ID-ul este : " + eID);
			this.getRouter().navTo("aEvent"

				, {

					eventID: eID,
					userID : uID

				});
		},
		 onCreatePress : function(oEvent) {
		 	uID = oEvent.getSource().getBindingContext().getObject().IdUser;
		// 	//var oView = this.getView();
		// 	//var oModel = oView.getModel();
		// 	//var title = "****PSD";
		// 	// var oData = { Title : title };
		// 	// oModel.create("/EventSet", oData, {
		// 	// 	success: function(oCreateEntry) {
		// 	// 		this.getRouter().navTo("createEvent",
		// 	// 		{
		// 	// 			eventID : oCreateEntry.IdEvent
		// 	// 		}
		// 	// 		);
		// 	// 	},
		// 	// 	error: function(oError){}
		// 	// } );
		 	this.getRouter().navTo("firstCreateEvent", {

					userID : uID

				});
		// 	// 		{
		// 	// 			eventID : oCreateEntry.IdEvent
		// 	// 		}
		// 	// 		);
		 }

	});
});