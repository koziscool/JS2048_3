

view2048 = {

	model: model2048,

	updateTiles: function( ) {
		var $grid = $('#grid');
		var row, col, color;
		for( var i = 0; i < this.model.tiles.length; i++ ) {
			var value = this.model.tiles[i];
			var display = value ? value : "";
			var $tileDiv = $('<div><div class="name">' + display + '</div></div>');
			$tileDiv.addClass('tile');
			row = this.model.row(i);
			col = this.model.col(i);
			color = this.model.getColor(value);
			$tileDiv.css({
				left: col*128,
				top: row*128,
				background: color
			});
			$grid.append( $tileDiv );
		}

	},
	
	updateScore: function(  ) {
		var $score = $('#score');
		$score.text( this.model.gameScore );
		var $moves = $('#moves');
		$moves.text( this.model.numMoves );
		var $time = $('#time');
		$time.text( this.model.elapsedTime );
		var $edge = $('#edge-weight');
		$edge.text( this.model.computeEdgeWeight() );
		var $total = $('#total-weight');
		$total.text( this.model.computeTotalWeight() );
	},
};


