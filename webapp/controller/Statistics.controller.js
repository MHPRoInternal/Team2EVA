sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	"sap/ui/commons/TextField",
	"sap/ui/table/Table"
], function(BaseController, TextField, Table) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.Statistics", {

		onInit: function() {
			this.getRouter().getRoute("Statistics").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function(oEvent) {

			var oView = this.getView();
			var oModel = oView.getModel();
			var usersName = oEvent.getParameter("arguments").nameUser;
			var eventID = oEvent.getParameter("arguments").eID;

			oView.byId("nameLabelStats").setText(usersName);

			var columnDataList = [{
				columnName: "Id User"
			}, {
				columnName: "Name"
			}, {
				columnName: "Mail"
			}, {
				columnName: "Confirmation"
			}];
			var rowDataList = [];
			var oCompleteEntryStatisticsList = [];
			var oCompleteEntryAnswersList = [];
			oModel.read("/EventSet('" + eventID + "')/toQuestion", {
				success: function(oCompleteEntry) {
					oCompleteEntry.results.forEach(function(item) {
						var columnData = {
							columnName: item.QuestionText,
							questionId: item.IdQuestion
						};
						columnDataList.push(columnData);
					});

					oModel.read("/EventSet('" + eventID + "')/toStatistic", {
						success: function(oCompleteEntryStatistics) {
							oCompleteEntryStatisticsList = oCompleteEntryStatistics.results;

							oModel.read("/EventSet('" + eventID + "')/toAnswer", {
								success: function(oCompleteEntryAnswers) {
									oCompleteEntryAnswersList = oCompleteEntryAnswers.results;

									oCompleteEntryStatisticsList.forEach(function(item) {
										var rowData = {};
										rowData[columnDataList[0].columnName] = item.IdUser;
										rowData[columnDataList[1].columnName] = item.Name;
										rowData[columnDataList[2].columnName] = item.Mail;
										rowData[columnDataList[3].columnName] = item.Confirmation;
										for (var i = 4; i < columnDataList.length; i++) {

											oCompleteEntryAnswersList.forEach(function(answer) {
												if (columnDataList[i].questionId === answer.IdQuestion && item.IdUser === answer.IdUser) {

													rowData[columnDataList[i].columnName] = answer.AnswerText;
												}
											});
										}

										rowDataList.push(rowData);
									});
								}
							});
						}
					});
				}
			});

			var oTable = oView.byId("statisticTable");
			if (!oTable) {
				oTable = new sap.ui.table.Table(oView.createId("statisticTable"), {
					selectionMode: "None"
				});
			}

			oModel.attachRequestCompleted(function() {

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
						template: columnName,
						sortProperty: columnName

					});
				});

				oTable.bindRows("/rows");
				oView.byId("tableContent").addContent(oTable);
			});

		}
	});
});