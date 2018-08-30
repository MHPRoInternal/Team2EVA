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
		init: function() {
			this.oUserModel1 = new sap.ui.model.json.JSONModel({
				IdUser: "",
				Password: ""

			});
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			// set the device model
			//this.setModel(models.createDeviceModel(), "device");
		}
	});
});