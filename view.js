

view2048 = {

	model: model2048,

	updateTiles: function( ) {
		var $grid = $('#grid');
		var row, col, color;
		console.log(this.model.tiles.length);
		for( var i = 0; i < this.model.tiles.length; i++ ) {
			var value = this.model.tiles[i];
			console.log(value);
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

};


