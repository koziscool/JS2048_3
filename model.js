

model2048 = {

	SIDE: 4,
	tiles: Array(16).fill(0),
	newTiles: Array(16).fill(0),
	colors: [ 'lightgray','orange', 'darkkhaki', 'teal', 'limegreen', 'deepskyblue', 
      'navy', 'darkslategray', 'gray', 
      'olive', 'orchid', 'darkred', 'black', 'darkgreen', 'lightblue', 'pink'],
	
	init: function(  ) {
		
	},

	row: function( i ) { return Math.floor( i / this.SIDE );},
	col: function( i ) { return i % this.SIDE; },	
	getColor: function( value ) {
		var index = Math.max( Math.floor(Math.log2(value)), 0);
		return this.colors[index];
	}
};


