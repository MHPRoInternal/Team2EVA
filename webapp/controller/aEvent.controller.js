sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	var eID = null;

	return BaseController.extend("eventManagementEVA.controller.aEvent", {
		
		onInit: function(oEvent) {
			this.getRouter().getRoute("aEvent").attachMatched(this.onRouteMatched, this);
			//sap.ui.getCore().loadLibrary("sapui5.googlemaps", "../sapui5/googlemaps/");
		},
		
		onSwitchEditMode: function(oEvent) {
			var bState = oEvent.getSource().getState();
			var oInput = this.getView().byId("eTitleInput");
			oInput.setEditable(bState);
			oInput = this.getView().byId("eLocationInput");
			oInput.setEditable(bState);
			oInput = this.getView().byId("eDataInput");
			oInput.setEditable(bState);
			oInput = this.getView().byId("eDresscodeInput");
			oInput.setEditable(bState);
			oInput = this.getView().byId("ePictureInput");
			oInput.setEditable(bState);
		},
		
		onRouteMatched: function(oEvent) {
			eID = oEvent.getParameter("arguments").eventID;
			//id_event sau IdEvent
			console.log("1 " + eID);
			//	var oUserModel = this.getOwnerComponent().getModel("userModel");
			//console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			var oView = this.getView();
			var oModel = oView.getModel();
			console.log("3 " + eID);
			
			// oModel.read("/EventSet(IdEvent='" + eID + "')", {
			// 	success: function(oCompleteEntry) {
			// 		console.log(oCompleteEntry);
			// 	},
			// 	error: function(oError){
			// 	console.log("ERROR!");
			// 	}
			// });
			// oModel.metadataLoaded().then(function(){
			// 		//trimit request la server
			// 		oView.bindElement("/EventSet(" + eID + " ) ");
			// 		console.log("3 " + eID);
			// 	}); 
			
			this.getView().bindElement("/EventSet('" + eID + "')");

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