
controller2048 = {
	model: model2048,
	view: view2048,
	solver: solver2048,

	init: function(  ) {
		this.model.init();
		this.view.updateTiles();
		this.view.updateScore();
	},

	solve: function( numMoves ) {
		this.solver.go( numMoves );
	},

};


var handleKey = function( e ) {
	switch( e.keyCode ){
		case 37: // left
			model2048.moveLeft();
			break;
		case 38: // up
			model2048.moveUp();
			break;
		case 39: // right
			model2048.moveRight();
			break;
		case 40: // down
			model2048.moveDown();
			break;
	}
	view2048.updateTiles();
	view2048.updateScore();
};

$(document).ready( function() {
	controller2048.init();
	window.addEventListener( 'keydown', handleKey );

	$('input[type=submit]').click( function( e ) {
		e.preventDefault();
		var numMoves = $('#num-moves').val();
		controller2048.solve(numMoves);
	});

});
