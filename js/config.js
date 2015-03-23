var getConfig = function() {
	var config = {
		filter: {
					player: {
							condition: "eq",
							val: "rg sharma"
					},
					team: {
							condition: "eq",
							val: "India"
					},
					inningOrder: {
							condition: "eq",
							val: "chase"
					},
					
					runs: {
						condition: "gte",
						val: "100"
					}
					
				},
		count: "result"
		
	};
	return config;

}