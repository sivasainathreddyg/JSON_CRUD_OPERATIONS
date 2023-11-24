/*global QUnit*/

sap.ui.define([
	"project2/controller/project2.controller"
], function (Controller) {
	"use strict";

	QUnit.module("project2 Controller");

	QUnit.test("I should test the project2 controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
