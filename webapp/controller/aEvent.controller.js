sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Element',
	'sap/m/MessageToast'

], function(BaseController, Element, MessageToast) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.aEvent", {

		onInit: function(oEvent) {
			var oView = this.getView();
			this.getRouter().getRoute("aEvent").attachMatched(this._onRouteMatched, this);
			this.getView().byId("map_canvas").addStyleClass("myMap");
			this.updateBtn = oView.byId("eventUpdate");
			this.deleteBtn = oView.byId("eventDelete");
			this.createdByLabel = oView.byId("createdBy");
			this.markers = [];
			this.selectList = [];

			this.oSwitchStateModel = new sap.ui.model.json.JSONModel({
				Editable: false,
				Visible: false
			});
			oView.setModel(this.oSwitchStateModel, "switchStateModel");

		},
		onAfterRendering: function(oEvent) {
			this.viewSwitchStateModel = this.getView().getModel("switchStateModel");
			this.viewSwitchStateModel.getProperty("/Editable");
			this.viewSwitchStateModel.getProperty("/Visible");

		},
		actSearch: function() {

			var oView = this.getView();
			var latitude;
			var longitude;
			var map = this.map;
			var address = this.getView().byId("Location").getValue();
			this.markers.forEach(function(marker) {
				marker.setMap(null);
			});
			this.markers = [];
			this.geocoder.geocode({
				'address': address
			}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location

					});
					this.markers.push(marker);
					latitude = results[0].geometry.location.lat();
					longitude = results[0].geometry.location.lng();
					oView.byId("Latitude").setValue(latitude);
					oView.byId("Longitude").setValue(longitude);

				} else {
					console.log('Geocode was not successful for the following reason: ' + status);
					new sap.m.MessageToast.show("Location could not be found. Please try again.");
				}
			}.bind(this));
		},

		onSwitchEditMode: function(oEvent) {

			var oView = this.getView();
			this.latitude = oView.byId("Latitude").getValue();
			this.longitude = oView.byId("Longitude").getValue();
			var switchBtn = oView.byId("switchBtn");
			var state = switchBtn.getState();
			this.viewSwitchStateModel.setProperty("/Editable", state);
			this.viewSwitchStateModel.setProperty("/Visible", state);
		},

		onSelectChange: function(oEvent) {
			var oView = this.getView();
			var questionBox = oView.byId("questionBox");
			var counter = questionBox.getItems().length;
			var questionID = oEvent.getSource().getBindingContext().getObject().IdQuestion;
			var answerSelect = oEvent.getParameters().selectedItem.getText();
			console.log("ID-ul question-ului in aEvent este: " + questionID);

			this.questionAnswerList = {
				IdQuestion: questionID,
				AnswerText: answerSelect
			};
			console.log("answer LIST este: " + this.questionAnswerList);
			this.selectList.forEach(function(list) {
				if (this.questionAnswerList.IdQuestion === questionID) {

				}
			}.bind(this));
			this.selectList.push(this.questionAnswerList);
			console.log("selectList-ul este: " + this.selectList);
		},

		onConfirmTap: function(oEvent) {

			var oView = this.getView();
			var questionBox = oView.byId("questionBox");
			var counter = questionBox.getItems().length;
			var getItems = questionBox.getItems();
			console.log("Asta ia getItems(): " + getItems);
			// var questionID = oEvent.getSource().getBindingContext().getObject().IdQuestion;
			// var answerSelect = oEvent.getParameters().selectedItem.getText();
			// console.log("ID-ul question-ului in aEvent este: " + questionID);

			// this.questionAnswerList = {
			// 	IdQuestion: questionID,
			// 	AnswerText: answerSelect
			// };
			// console.log("answer LIST este: " + this.questionAnswerList);
			questionBox.getItems().forEach(function(item) {
				var answerSelect1 = oView.byId("answerSelect").selectedItem;
				console.log("Valoarea din select este: " + answerSelect1)
					// 	if (this.questionAnswerList.IdQuestion === ) {
					// 	}
			});
			// this.selectList.push(this.questionAnswerList);
			// console.log("selectList-ul este: " + this.selectList);

			// console.log("FLEXBOX get items is: " + counter);
		},

		onAcceptTap: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var confirmation = "Y";
			var oData = {
				Confirmation: confirmation
			};

			oModel.update("/UserEventSet(IdUser='" + this.uID + "', IdEvent='" + this.eID + "'", oData, {
				success: function(oCompletedEntry) {
					oView.byId("acceptBtn").setEnabled(false);
					oView.byId("acceptBtn").setVisible(false);
					oView.byId("declineBtn").setEnabled(true);
					oView.byId("declineBtn").setVisible(true);
					MessageToast.show("Event attendance confirmed for user " + this.uID + "!", {

						animationDuration: 5000

					});
					console.log("SUCCESS?");
				},
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR?");
				}
			});
		},
		onDeclineTap: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var confirmation = "N";
			var oData = {
				Confirmation: confirmation
			};
			oModel.update("/UserEventSet(IdUser='" + this.uID + "', IdEvent='" + this.eID + "'", oData, {
				success: function(oCompletedEntry) {
					oView.byId("declineBtn").setEnabled(false);
					oView.byId("declineBtn").setVisible(false);
					oView.byId("acceptBtn").setEnabled(true);
					oView.byId("acceptBtn").setVisible(true);
					MessageToast.show("Event attendance confirmed for user " + this.uID + "!", {

						animationDuration: 5000

					});
					console.log("SUCCESS?");
				},
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR?");
				}
			});
		},

		onUpdatePress: function(oEvent) {

			var oView = this.getView();
			var oModel = oView.getModel();
			// var title = oView.byId("Title").getValue();
			// var location = oView.byId("Location").getValue();
			// var latitude = oView.byId("Latitude").getValue();
			// var longitude = oView.byId("Longitude").getValue();
			// var date = oView.byId("Date").getValue();
			// var time = oView.byId("Time").getValue();
			// var dressCode = oView.byId("Dresscode").getValue();
			// var oData = {
			// 	Title: title,
			// 	Location: location,
			// 	Latitude: latitude,
			// 	Longitude: longitude,
			// 	Data: date,
			// 	Time: time,
			// 	Dresscode: dressCode
			// };

			// oModel.update("/EventSet(IdEvent='" + eID + "'", oData, {
			// 	success: function(oCompletedEntry) {

			// 		MessageToast.show("Update successful for the event with ID: " + eID + "!", {

			// 			animationDuration: 5000

			// 		});
			// 		console.log("SUCCESS?");
			// 	},
			// 	error: function(oError) {
			// 		MessageToast.show("Changes could not be made! Please try again.");
			// 		console.log("ERROR?");
			// 	}
			// });

			var switchBtn = oView.byId("switchBtn");
			var state = switchBtn.getState();
			switchBtn.setState(false);
			this.viewSwitchStateModel.setProperty("/Editable", false);
			this.viewSwitchStateModel.setProperty("/Visible", false);

			// var updateBtn = this.getView().byId("eventUpdate");
			// var deleteBtn = this.getView().byId("eventDelete");
			// var switchBtn = this.getView().byId("switchBtn");
			// switchBtn.setState(false);
			// updateBtn.setVisible(false);
			// deleteBtn.setVisible(false);
			// oModel.setUseBatch("true");
			// oModel.submitChanges({
			// 	success: jQuery.proxy(function() {
			// 		new sap.m.MessageToast.show("Changes successfully saved!");
			// 	}, this),
			// 	error: jQuery.proxy(function() {
			// 		oModel.setUseBatch(false);
			// 		new sap.m.MessageToast.show("Error saving changes!");

			// 	}, this)
			// });
		},

		_onRouteMatched: function(oEvent) {
			var oView = this.getView();
			this.eID = oEvent.getParameter("arguments").eventID;
			this.uID = oEvent.getParameter("arguments").userID;
			var createdByText = "Event created by - " + this.uID;
			this.userRole = oEvent.getParameter("arguments").uRole;
			this.createdByLabel.setText(createdByText);
			this.acceptBtn = oView.byId("acceptBtn");
			this.declineBtn = oView.byId("declineBtn");
			this.switchBtn = oView.byId("switchBtn");

			var state = this.switchBtn.getState();
			this.updateBtn.setVisible(state);
			this.deleteBtn.setVisible(state);

			if (this.userRole === "true") {
				this.acceptBtn.setVisible(false);
				this.declineBtn.setVisible(false);
				this.switchBtn.setState(false);

				/*	va model = new sap.ui.model.JSON.JsonModel();
					var Data ={
						visible: false
					}
					model.setData(Data);
					view.setModel(model, "modelLocal")*/
			} else if (this.userRole === "false") {
				this.switchBtn.setVisible(false);
				this.switchBtn.setEnabled(false);
				this.updateBtn.setVisible(false);
				this.deleteBtn.setVisible(false);
			}

			console.log("1 " + this.eID);
			//	var oUserModel = this.getOwnerComponent().getModel("userModel");
			//console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			// var oModel = oView.getModel();
			// console.log("3 " + eID);

			oView.bindElement({
				path: "/EventSet('" + this.eID + "')",
				events: {
					dataReceived: function(oData) {

						//oData.getParameters().data.Latitude
						var myLatlng = new google.maps.LatLng(oData.getParameters().data.Latitude, oData.getParameters().data.Longitude);
						var mapOptions = {
							zoom: 15,
							center: myLatlng
						};
						this.map = new google.maps.Map(oView.byId("map_canvas").getDomRef(), mapOptions);
						this.geocoder = new google.maps.Geocoder();
						var marker = new google.maps.Marker({
							position: myLatlng,
							title: "Event location"
						});

						// To add the marker to the map, call setMap();
						marker.setMap(this.map);
						this.markers.push(marker);
					}.bind(this)
				}
			});
		}

	});

});