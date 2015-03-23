var filterData = function(data, config) {
	var filteredData = [];
		
	if(config.filter) {
		data.each(function(_d){
			var push = true;
			for(f in config.filter) {
				var match = true;
				switch(config.filter[f].condition) {
					case("eq"): if(_d[f].toString().toLowerCase().indexOf(config.filter[f].val.toString().toLowerCase()) == -1) {
									match = false;
								}
								break;
					case("gt"): if(_d[f] <= config.filter[f].val) {
									match = false;
								}
								break;
					case("gte"): if(_d[f] < config.filter[f].val) {
									match = false;
								}
								break;
					case("lt"): if(_d[f] >= config.filter[f].val) {
									match = false;
								}
								break;
					case("lte"): if(_d[f] > config.filter[f].val) {
									match = false;
								}
								break;
					default: match = true;
				}
				if(!match) {
					push = false;
					break;
				}
				
			}
			push && filteredData.push(_d);
		});
	} else {
		filteredData = data;
	}
		
	return filteredData;
};

