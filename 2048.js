
controller2048 = {
	model: model2048,
	view: view2048,

	init: function(  ) {
		this.model.init();
		this.view.updateTiles();
	},

};


var handleKey = function( e ) {
	switch( e.keyCode ){
		case 37: // left
			model2048.move( false, "r" );
			break;
		case 38: // up
			model2048.move( false, "c" );
			break;
		case 39: // right
			model2048.move( true, "r" );
			break;
		case 40: // down
			model2048.move( true, "c" );
			break;
	}
	view2048.updateTiles();
};

$(document).ready( function() {
	controller2048.init();
	window.addEventListener( 'keydown', handleKey );
});
