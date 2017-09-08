
controller2048 = {
	model: model2048,
	view: view2048,

	init: function(  ) {
		this.model.init();
		this.view.updateTiles();
	},

};



$(document).ready( function() {
	controller2048.init();
});
