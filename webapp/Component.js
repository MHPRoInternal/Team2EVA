sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"eventManagementEVA/model/models"
], function(UIComponent, Device, models) {
	"use strict";

	return UIComponent.extend("eventManagementEVA.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		 
		init: function() {
			this.oUserModel1 = new sap.ui.model.json.JSONModel({
				IdUser: "",
				Password: ""

			});
			
			this.oUserModel2 = new sap.ui.model.json.JSONModel({
				IdUser: "",
				Password: ""

			});
			

			this.setModel(this.oUserModel1, "qModel");
			this.setModel(this.oUserModel2, "aModel");
			
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
		}
	});
});