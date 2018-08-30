sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	"sap/ui/commons/TextField",
	"sap/ui/table/Table"
], function(BaseController, TextField, Table) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.Statistics", {

		onInit: function() {
			this.getRouter().getRoute("Statistics").attachMatched(this._onRouteMatched, this);
			this.viewID = this.getView().getId();
			this.oView = this.getView();
		},

		_onRouteMatched: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var usersName = oEvent.getParameter("arguments").nameUser;
			var uID = oEvent.getParameter("arguments").userID;
			var eventID = oEvent.getParameter("arguments").eID;

			var oModel = oView.getModel();
			oView.byId("nameLabelStats").setText(usersName);

			//                           oView.bindElement("/EventSet('" + eventID + "')");

			// statsTable.bindColumns("toStatistic", function(index, context) {
			//            var confirm = context.getProperty().Confirmation;
			//            var mails = context.getProperty().Mail;
			//            console.log("Context: " + context.getProperty().Confirmation); 
			//            return new sap.ui.table.Column({
			//                           label: confirm,
			//                           template: new TextField({value: mails})
			//            });
			// });
			var columnDataList = [];
			var rowDataList = [];
			oModel.read("/EventSet('" + eventID + "')/toQuestion", {
				success: function(oCompleteEntry) {
					console.log(oCompleteEntry);
					oCompleteEntry.results.forEach(function(item) {
						var columnData = {
							columnName: item.QuestionText
						};
						columnDataList.push(columnData);
					});
					oModel.read("/QuestionSet(IdQuestion'" + oCompleteEntry.results.IdQuestion + "', IdUser'" + uID + "', IdEvent'" + eventID +
						"')/toAnswer", {
							success: function(oCompleteEntryAnswers) {
								columnDataList.forEach(function(item) {
									console.log(oCompleteEntryAnswers);
									var rowData = [{
										rows: oCompleteEntryAnswers.results.QuestionText
									}];
									rowDataList.push(rowData);
								});
								var oTable = new sap.ui.table.Table({
									selectionMode: "None"
								});

								var oModel1 = new sap.ui.model.json.JSONModel();
								oModel1.setData({
									rows: rowDataList,
									columns: columnDataList
								});
								oTable.setModel(oModel1);

								oTable.bindColumns("/columns", function(sId, oContext) {
									var columnName = oContext.getObject().columnName;
									return new sap.ui.table.Column({
										autoResizable: true,
										label: columnName,
										template: columnName
									});
								});

								oTable.bindRows("/rows");
								oView.byId("tableContent").addContent(oTable);
							}
						});
				}
			});
		}
	});
});