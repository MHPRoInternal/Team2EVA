sap.ui.define([], function() {
	"use strict";
	return {
		calculateDaysRemaining: function(eventDate) {
			var todayDate = new Date();
			todayDate.setHours(0,0,0,0);
			eventDate.setHours(0,0,0,0);
			var diff = eventDate.getTime() - todayDate.getTime();
			if (diff >= 0) {
				var daysRemaining = parseInt(diff / (1000 * 60 * 60 * 24));
				if (daysRemaining === 0) {
					return ", Today!";
				} else {
					return ", " + daysRemaining + " days left!";
				}
			} else {
				return ", Expired";
			}
		}
	};
});