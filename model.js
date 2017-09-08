

model2048 = {

	SIDE: 4,
	tiles: Array(16).fill(0),
	newTiles: Array(16).fill(0),
	probabilityNew2: 0.9,

	colors: [ 'lightgray','orange', 'darkkhaki', 'teal', 'limegreen', 'deepskyblue', 
      'navy', 'darkslategray', 'gray', 
      'olive', 'orchid', 'darkred', 'black', 'darkgreen', 'lightblue', 'pink'],
	
	init: function(  ) {
		this.addNewSquare();
		this.addNewSquare();
	},

	row: function( i ) { return Math.floor( i / this.SIDE );},
	col: function( i ) { return i % this.SIDE; },	
	getColor: function( value ) {
		var index = Math.max( Math.floor(Math.log2(value)), 0);
		return this.colors[index];
	},

	getEmptySquares: function(  ) {
		var emptiesIndexes = [];
		for( var index in this.tiles ) {
			if( !this.tiles[index] ) emptiesIndexes.push(index);
		}
		return emptiesIndexes;
	},

	addNewSquare: function(  ) {
		var empties = this.getEmptySquares();
		var randomEmpty = empties[ Math.floor( Math.random() * empties.length ) ];
		this.tiles[ randomEmpty ] = this.randomNewValue();
	},

	randomNewValue: function(  ) {
		return Math.random() < this.probabilityNew2 ? 2 : 4;
	},



};


