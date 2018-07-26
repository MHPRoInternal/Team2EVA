sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new sap.ui.model.odata.v2.ODataModel("/destinations/M38/sap/opu/odata/sap/ZTEAM2_SRV");
			
			return oModel;
		}
	};
});