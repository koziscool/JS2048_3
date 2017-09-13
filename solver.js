
solver2048 = {
	model: model2048,
	numMoves: 10,

	go: function( numMoves ) {
		this.numMoves = numMoves || this.numMoves;
		console.log("go", this.numMoves);
		for (var i = 0 ; i < this.numMoves; i++) {
			this.solve()
		}
	},

	solve: function( ){
		console.log('solve');
	},

	fitness: function() {

	},

	monteCarlo: function(){
		
	}
};


