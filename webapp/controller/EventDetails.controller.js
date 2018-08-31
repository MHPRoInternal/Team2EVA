sap.ui.define([
	"eventManagementEVA/controller/BaseController",
	'sap/ui/core/Element',
	'sap/m/MessageToast',
	'sap/m/Dialog',
	'sap/m/Button',
	'sap/m/Text'

], function(BaseController, Element, MessageToast, Dialog, Button, Text) {
	"use strict";

	return BaseController.extend("eventManagementEVA.controller.EventDetails", {

		onInit: function(oEvent) {
			this.getRouter().getRoute("EventDetails").attachMatched(this._onRouteMatched, this);
		},

		onAfterRendering: function(oEvent) {
			this.viewSwitchStateModel = this.getView().getModel("switchStateModel");
			this.viewSwitchStateModel.getProperty("/Editable");
			this.viewSwitchStateModel.getProperty("/Visible");

		},
		//search function for the EventDetails map
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
			var viewSwitchStateModel = this.getView().getModel("switchStateModel");
			this.latitude = oView.byId("Latitude").getValue();
			this.longitude = oView.byId("Longitude").getValue();
			var state = this.switchBtn.getState();
			this.updateBtn.setEnabled(state);
			viewSwitchStateModel.setProperty("/Editable", state);
			viewSwitchStateModel.setProperty("/Visible", state);
		},

		onSelectChange: function(oEvent) {
			if (this.globalDiff >= 0 && this.globalDaysremaining >= 7) {
				console.log("A trecut de primul if");
				var flag = this.acceptBtn.getEnabled();
				if (flag === false) {
					console.log("Intra in if-ul de la 73");
					this.updateBtn.setEnabled(true);
				}
			}
		},

		// getSelectedAnswer: function(oEvent) {
		// 	var oView = this.getView();
		// 	var oModel = oView.getModel();
		// 	var questionBox = oView.byId("questionBox");
		// 	questionBox.getItems().forEach(function(item) {
		// 		questionID = item.getBindingContext().getObject().IdQuestion;
		// 		oModel.read("/UserSet(IdQuestion='" + questionID + "',IdUser='" + this.uID + "', IdEvent='" + this.eID + "')", {
		// 			success: function(oCompletedEntry) {
		// 				item.setSelectedKey(oCompletedEntry.AnswerText);
		// 				console.log("Selected key text is: " + oCompletedEntry.AnswerText);
		// 			}.bind(this),
		// 			error: function(oError) {
		// 				new MessageToast.show("DIS NAT VORKING!")
		// 			}.bind(this)
		// 		});
		// 	});
		// },

		onUpdateQuestionsTap: function(oEvent) {
			var selectList = [];
			var oView = this.getView();
			var oModel = oView.getModel();
			var questionBox = oView.byId("questionBox");
			//var counter = questionBox.getItems().length;
			var getItems = questionBox.getItems();
			console.log("Asta ia getItems(): " + getItems);
			// var questionID = this.getSource().getBindingContext().getObject().IdQuestion;
			// console.log();
			// var answerSelect = oEvent.getParameters().selectedItem.getText();
			// console.log("ID-ul question-ului in EventDetails este: " + questionID);
			var userID = this.uID;
			var eventID = this.eID;
			// console.log("answer LIST este: " + this.questionAnswerList);
			questionBox.getItems().forEach(function(item) {
				if (item.getItems()[1].getSelectedItem() !== null) {
					var answerSelect = item.getItems()[1].getSelectedItem().getText();
					var questionID = item.getBindingContext().getObject().IdQuestion;
					item.getItems()[1].setValueState(sap.ui.core.ValueState.None);

					var questionAnswerList = {
						IdQuestion: questionID,
						AnswerText: answerSelect
					};
					selectList.push(questionAnswerList);

				} else {
					new MessageToast.show("Please do not leave answers empty.");
					return;
				}
			});
			selectList.forEach(function(items) {
				var questionAnswerCreateList = {
					IdQuestion: items.IdQuestion,
					IdUser: userID,
					IdEvent: eventID,
					AnswerText: items.AnswerText
				};
				oModel.create("/AnswerSet", questionAnswerCreateList, {
					success: function(oCompleteEntry) {
						setTimeout(MessageToast.show("Question options updated successfully", {

							animationDuration: 1000

						}), 2000);
						oView.byId("updateBtn").setEnabled(false);
					}.bind(this),
					error: function(oError) {
						setTimeout(MessageToast.show("Question options could not be updated.", {

							animationDuration: 1000

						}), 2000);
					}
				});
			});
			oModel.refresh(true);
		},

		onAcceptTap: function(oEvent) {
			var oView = this.getView();
			var questionBox = oView.byId("questionBox");
			questionBox.getItems().forEach(function(item) {
				if (item.getItems()[1].getSelectedItem() === null || item.getItems()[1].getSelectedItem() === "") {
					item.getItems()[1].setValueState(sap.ui.core.ValueState.Error);
					new MessageToast.show("Please do not leave answers empty.");
					return;
				} else {
					item.getItems()[1].setValueState(sap.ui.core.ValueState.None);
				}
			});
			this.acceptUpdate();
		},

		acceptUpdate: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var confirmation = "Y";
			var oData = {
				Confirmation: confirmation
			};

			oModel.update("/UserEventSet(IdUser='" + this.uID + "',IdEvent='" + this.eID + "')", oData, {
				success: function(oCompletedEntry) {
					oView.byId("updateBtn").setEnabled(false);
					oView.byId("acceptBtn").setEnabled(false);
					oView.byId("declineBtn").setEnabled(true);
					oView.byId("declineBtn").setVisible(true);
					MessageToast.show("Event attendance confirmed for user " + this.uID + "!", {

						animationDuration: 1000

					});

				}.bind(this),
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR?");
				}.bind(this)
			});
			this.onUpdateQuestionsTap();
		},

		onDeclineTap: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var confirmation = "N";
			var oData = {
				Confirmation: confirmation
			};
			oModel.update("/UserEventSet(IdUser='" + this.uID + "',IdEvent='" + this.eID + "')", oData, {
				success: function(oCompletedEntry) {
					oView.byId("declineBtn").setEnabled(false);
					oView.byId("acceptBtn").setEnabled(true);
					oView.byId("acceptBtn").setVisible(true);
					oView.byId("updateBtn").setEnabled(false);

					MessageToast.show("Event attendance confirmed for user " + this.uID + "!", {

						animationDuration: 5000

					});
					console.log("SUCCESS?");
				}.bind(this),
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR?");
				}.bind(this)
			});
		},

		onUpdatePress: function(oEvent) {
			var switchState = this.switchBtn.getState();
			if (switchState === true) {
				var dialog = new Dialog({
					title: 'Confirm',
					type: 'Message',
					content: new Text({
						text: "Would you like to send update notifications?"
					}),
					beginButton: new Button({
						text: 'Yes',
						press: function() {
							this.sendUpdates = true;
							this.onAdminUpdate();
							dialog.close();
						}.bind(this)
					}),
					endButton: new Button({
						text: 'No',
						press: function() {
							this.onAdminUpdate();
							dialog.close();
						}.bind(this)
					}),
					afterClose: function() {
						dialog.destroy();
					}
				});
				dialog.open();
			} else {
				this.onUpdateQuestionsTap();
			}
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

		onAdminUpdate: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			var title = oView.byId("Title").getValue();
			var location = oView.byId("Location").getValue();
			var latitude = oView.byId("Latitude").getValue();
			var longitude = oView.byId("Longitude").getValue();
			var date = oView.byId("Date").getValue() + "T00:00:00";
			var time = oView.byId("Time").getValue();
			var dressCode = oView.byId("Dresscode").getValue();

			var oData = {
				Title: title,
				Location: location,
				Latitude: latitude,
				Longitude: longitude,
				Data: date,
				Time: time,
				Dresscode: dressCode,
				CreatedBy: this.adminEmail,
				SendUpdates: this.sendUpdates
			};
			console.log("ID eventului este: " + this.eID);
			oModel.update("/EventSet(IdEvent='" + this.eID + "')", oData, {
				success: function(oCompletedEntry) {
					this.switchBtn.setState(false);
					this.onUpdateQuestionsTap();

					MessageToast.show("Update successful!", {

						animationDuration: 5000

					});
					console.log("SUCCESS UPDATE?");
				}.bind(this),
				error: function(oError) {
					MessageToast.show("Changes could not be made! Please try again.");
					console.log("ERROR UPDATE?");
				}.bind(this)
			});

			this.viewSwitchStateModel.setProperty("/Editable", false);
			this.viewSwitchStateModel.setProperty("/Visible", false);
		},

		onApproveNotificationDialog: function(oEvent) {
			var dialog = new Dialog({
				title: 'Confirm',
				type: 'Message',
				content: new Text({
					text: "Are you sure you want to update the event?"
				}),
				beginButton: new Button({
					text: 'Yes',
					press: function() {
						this.onUpdatePress();
						dialog.close();
					}.bind(this)
				}),
				endButton: new Button({
					text: 'No',
					press: function() {
						dialog.close();
					}
				}),
				afterClose: function() {
					dialog.destroy();
				}
			});
			dialog.open();
		},

		onStatisticsPress: function() {
			this.getRouter().navTo("Statistics", {
				userID: this.uID,
				eID: this.eID,
				nameUser: this.usersName
			});
		},

		transformEmail: function() {
			var oView = this.getView();
			var adminCreatedByEmail = this.adminEmail;

			var indexDot = adminCreatedByEmail.indexOf(".");
			var firstName = adminCreatedByEmail.substr(0, indexDot);
			var createdByFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

			var indexAtSign = adminCreatedByEmail.indexOf("@");
			var lastName = adminCreatedByEmail.substr(indexDot + 1, indexAtSign - indexDot - 1);
			var createdByLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1);

			oView.byId("createdBy").setText("Event created by " + createdByFirstName + " " + createdByLastName);
		},

		_checkEventDate: function(eventDate) {
			var oView = this.getView();
			var todayDate = new Date();
			todayDate.setHours(0, 0, 0, 0);
			eventDate.setHours(0, 0, 0, 0);
			var diff = eventDate.getTime() - todayDate.getTime();
			if (diff >= 0) {
				var daysRemaining = parseInt(diff / (1000 * 60 * 60 * 24));
				if (daysRemaining < 7) {
					//oView.byId("eventUpdate").setVisible(false);     
					this.acceptBtn.setEnabled(false);
					this.declineBtn.setEnabled(false);
					this.switchBtn.setEnabled(false);
					this.updateBtn.setEnabled(false);
				}else {
					this.switchBtn.setEnabled(true);
				}
			} else if (diff < 0) {
				this.declineBtn.setEnabled(false);
				this.acceptBtn.setEnabled(false);
				this.updateBtn.setEnabled(false);
				this.switchBtn.setEnabled(false);
			}
			this.globalDiff = diff;
			this.globalDaysremaining = daysRemaining;
		},

		_onRouteMatched: function(oEvent) {
			var oView = this.getView();
			var oModel = oView.getModel();
			this.eID = oEvent.getParameter("arguments").eventID;
			this.uID = oEvent.getParameter("arguments").userID;
			this.usersName = oEvent.getParameter("arguments").nameUser;
			this.getView().byId("nameLabel").setText(this.usersName);
			this.userRole = oEvent.getParameter("arguments").uRole;
			var userConfirmation = oEvent.getParameter("arguments").confirmation;
			this.acceptBtn = oView.byId("acceptBtn");
			this.declineBtn = oView.byId("declineBtn");
			this.switchBtn = oView.byId("switchBtn");

			this.getView().byId("map_canvas").addStyleClass("myMap");
			this.updateBtn = oView.byId("eventUpdate");
			this.currentUserLabel = oView.byId("userNameLabelTop");
			this.switchBtn = oView.byId("switchBtn");
			this.statisticsBtn = oView.byId("statisticsBtn");
			this.sendUpdates = false;
			this.byId("Date").setMinDate(new Date());
			this.markers = [];

			//setTimeout(this.getSelectedAnswer(), 300);

			this.oSwitchStateModel = new sap.ui.model.json.JSONModel({
				Editable: false,
				Visible: false
			});
			oView.setModel(this.oSwitchStateModel, "switchStateModel");

			if (this.userRole === "true") {
				this.acceptBtn.setVisible(false);
				this.acceptBtn.setEnabled(false);
				this.declineBtn.setVisible(false);
				this.switchBtn.setState(false);
			} else if (this.userRole === "false") {
				this.switchBtn.setVisible(false);
				this.switchBtn.setEnabled(false);
				this.statisticsBtn.setEnabled(false);
				this.statisticsBtn.setVisible(false);

				if (userConfirmation === "Y" || userConfirmation === "Accepted") {
					//this.updateBtn.setEnabled(true);
					this.acceptBtn.setEnabled(false);
					this.declineBtn.setVisible(true);
				} else if (userConfirmation === "N" || userConfirmation === "Declined") {
					this.updateBtn.setEnabled(false);
					this.acceptBtn.setVisible(true);
					this.acceptBtn.setEnabled(true);

				}
			}

			oView.bindElement({
				path: "/EventSet('" + this.eID + "')",
				events: {
					dataReceived: function(oData) {

					}.bind(this)
				}
			});
			//	var oUserModel = this.getOwnerComponent().getModel("userModel");
			//console.log(oUserModel.getProperty("/IdUser") + "S-a transmit si getproperty!");
			// var oModel = oView.getModel();
			// console.log("3 " + eID);
			oView.bindElement({
				path: "/EventSet('" + this.eID + "')",
				events: {
					dataReceived: function(oData) {
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

						console.log("oData createdBy data is: " + oData.getParameters().data.CreatedBy);
						// To add the marker to the map, call setMap();
						marker.setMap(this.map);
						this.markers.push(marker);
						this.adminEmail = oData.getParameters().data.CreatedBy;
						this.transformEmail();
						this._checkEventDate(oData.getParameters().data.Data);

					}.bind(this)
				}
			});
		}

	});

});