
// https://stackoverflow.com/a/11631472/6077935
const seeding = function(numPlayers){
	var rounds = Math.log(numPlayers)/Math.log(2)-1;
	var pls = [1,2];
	for(var i=0;i<rounds;i++){
		pls = nextLayer(pls);
	}
	return pls;
	function nextLayer(pls){
		var out=[];
		var length = pls.length*2+1;
		pls.forEach(function(d){
			out.push(d);
			out.push(length-d);
		});
		return out;
	}
}

const getBaseLog = function(x, y) {
	return Math.log(y) / Math.log(x);
}

const getTeams = function( teams, teamNames, round, game ) {
	const seeds = seeding( teams );

	if( 0 !== round ) {
		return [
			{
				'display': false,
				'id': '',
				'name': '',
				'rank': '',
			},
			{
				'display': false,
				'id': '',
				'name': '',
				'rank': '',
			}
		];
	}
	const id1 = 2 * game;
	const id2 = id1 + 1;

	return [
		{
			'display': seeds[ id1 ] < teams + 1,
			'id': id1,
			'name': teamNames[ seeds[ id1 ] - 1 ],
			'rank': seeds[ id1 ],
		},
		{
			'display': seeds[ id2 ] < teams + 1,
			'id': 2 * game + 1,
			'name': teamNames[ seeds[ id2 ] - 1 ],
			'rank': seeds[ id2 ],
		}
	];
}

const numberOfGamesPerRound = function( teams, round ) {
	const logval = getBaseLog( 2, teams );
	let numberRounds = Math.ceil( logval );
	let numberGames = 2 ** numberRounds / 2;
	while( round > 0 ) {
		numberGames = numberGames / 2;
		round--;
	}
	return [...Array(Math.floor(numberGames)).keys()];
}

const numberOfRounds = function( teams ) {
	let rounds = [];
	const logval = getBaseLog( 2, teams );
	let numberRounds = Math.ceil( logval );
	if( teams > 0 ) {
		rounds = [...Array(numberRounds).keys()];
	}
	return rounds;
}

export { getTeams, numberOfGamesPerRound, numberOfRounds }
