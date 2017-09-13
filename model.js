

model2048 = {

	SIDE: 4,
	tiles: Array(16).fill(0),
	newTiles: Array(16).fill(0),

	directions: [ 
		{ direction: "left", ascending: false, group_by: "r" },
		{ direction: "up", ascending: false, group_by: "c" },
		{ direction: "right", ascending: true, group_by: "r" },
		{ direction: "down", ascending: true, group_by: "c" }
	],
	eligibles: [],

	probabilityNew2: 0.9,
	gameScore: 0,
	numMoves: 0,
	startTime: 0,
	elapsedTime: 0,

	colors: [ 'lightgray','orange', 'darkkhaki', 'teal', 'limegreen', 'deepskyblue', 
		'navy', 'darkslategray', 'gray', 
		'olive', 'orchid', 'darkred', 'black', 'darkgreen', 'lightblue', 'pink'],
	
	init: function(  ) {
		this.addNewSquare();
		this.addNewSquare();
		this.startTime = new Date();
	},

	row: function( i ) { return Math.floor( i / this.SIDE );},
	col: function( i ) { return i % this.SIDE; },	
	index: function( row, col ) { return row * this.SIDE + col; },

	getColor: function( value ) {
		var index = Math.max( Math.floor(Math.log2(value)), 0);
		return this.colors[index];
	},

	notSameBoard: function( tiles1, tiles2 ) {
		var retBool = false;
		for( var index in tiles1 ) {
			retBool = retBool || ( tiles1[index] !== tiles2[index ] );
		}
		return retBool;
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

	lockedArray: function( arr ) {
		if( arr.indexOf(0) !== -1 ){
			var start = arr.indexOf(0);
			for( var i = start + 1; i < arr.length ; i++ ) {
				if( arr[i] !== 0 )  return false;
			}
			for( var i = 0; i < start - 1; i++ ) {
				if( arr[i] === arr[i+1] )  return false;
			}
			return true;
		} else {
			return ( 
				arr[0] !== arr[1] &&
				arr[1] !== arr[2] &&
				arr[2] !== arr[3] 
			);
		}
	},

	computeEligibleMoves: function(  ) {

		this.eligibles = [];
		for( var index in this.directions ) {
			var directionEligible = false;
			var o = this.directions[index];
			for( var i = 0; i < this.SIDE ; i++ ) {
				var values = [], indexes = [], k, index;
				for( var j = 0; j < this.SIDE ; j++ ) {
					o.ascending ? k = this.SIDE - j - 1 : k = j;
					o.group_by === "c" ? index = this.index(k, i) : index = this.index(i, k); 
					values.push( this.tiles[index] );
				}
				if( !this.lockedArray(values) ) directionEligible = true;
			}
			if( directionEligible ) this.eligibles.push( o.direction );
		}
		return this.eligibles;
	},

	stripBlanks: function( arr ) {
		return arr.filter( function(elt){ return !!elt; } );
	},

	collapseArray: function( arr ) {
		for( var i = 0; i < arr.length - 1; i++ ) {
			if( arr[i] === arr[i+1] ){
				arr[i] *= 2;
				this.gameScore += arr[i];
				arr[i+1] = 0;
			}
		}
		return this.stripBlanks( arr );
	},

	move: function( ascending, group_by ) {
		
		this.newTiles = this.tiles.slice();
		for( var i = 0; i < this.SIDE ; i++ ) {
			var values = [], indexes = [], k, index;
			for( var j = 0; j < this.SIDE ; j++ ) {
				ascending ? k = this.SIDE - j - 1 : k = j;
				group_by === "c" ? index = this.index(k, i) : index = this.index(i, k); 
				values.push( this.newTiles[index] );
				indexes.push( index );
			}

			values = this.stripBlanks(values);
			values = this.collapseArray(values);

			for( var j = 0; j < this.SIDE ; j++ ) {
				values[j] ? this.newTiles[ indexes[j] ] = values[j] : this.newTiles[ indexes[j] ] = 0;
			}
		}

		this.tiles = this.newTiles;
		this.addNewSquare();
		this.numMoves++;
		var now = new Date();
		this.elapsedTime = Math.floor( (now - this.startTime) / 1000 );
	},

	moveLeft: function( ) {
		this.computeEligibleMoves();
		if( this.eligibles.indexOf('left') >= 0 ) this.move( false, "r");
	},
	
	moveUp: function( ) { 
		this.computeEligibleMoves();
		if( this.eligibles.indexOf('up') >= 0 ) this.move( false, "c"); 
	},

	moveRight: function( ) { 
		this.computeEligibleMoves();
		if( this.eligibles.indexOf('right') >= 0 ) this.move( true, "r"); 
	},

	moveDown: function( ) { 
		this.computeEligibleMoves();
		if( this.eligibles.indexOf('down') >= 0 ) this.move( true, "c"); 
	},

};


