sap.ui.define([
	"eventManagementEVA/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.aDashboard", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf internshipinternship2018.view.Employee
		 */
		//	onInit: function() {
		//
		//	},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf internshipinternship2018.view.Employee
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf internshipinternship2018.view.Employee
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf internshipinternship2018.view.Employee
		 */
		//	onExit: function() {
		//
		//	}
		
		
		
// 		onListItemPress: function(oEvent){
// 			var oListItem = oEvent.getSource();
// 			var oBindingContext = oListItem.getBindingContext();
// 			var resumeId = oBindingContext.getObject().Resumeid;
			
// 			this.getRouter().navTo("resume", {
// 				resId : resumeId
// 			});
// },
// 		onBtnCreate : function() {
// 			this.getRouter().navTo("resumeCreate");
// 			}
	});

});