let _merge_sort_problem = {
	// Attributes relating to the context of the problem
	// (to be populated later)
	list: undefined,
	start: undefined,
	end: undefined,

	// object method solving the problem at hand
	// i.e. performing a merge-sort
	sort: function*() {
		if(this.start == this.end) {
			yield this.list[this.start];
			return;
		}

		const mid = Math.floor((this.start + this.end) / 2);
		const left = Object.setPrototypeOf(
			{end: mid},
			this
		).sort();
		const right = Object.setPrototypeOf(
			{start: mid + 1},
			this
		).sort();

		let next_smallest_left = left.next();
		let next_smallest_right = right.next();

		// standard merge-sort procedure...
		while(true) {
			if(next_smallest_left.value > next_smallest_right.value) {
				yield next_smallest_right.value;
				next_smallest_right = right.next();
			} else {
				yield next_smallest_left.value;
				next_smallest_left = left.next();
			}
			if(next_smallest_left.done) {
				// no more on left, yield the rest of right side
				yield next_smallest_right.value;
				yield* right;
				break;
			}
			if(next_smallest_right.done) {
				// ... vice versa
				yield next_smallest_left.value;
				yield* left;
				break;
			}
		}
	}
}

function custom_sort(input_list){
	const sorting_problem = Object.setPrototypeOf(
		{list: input_list, start: 0, end: input_list.length-1},
		_merge_sort_problem
	);
	return sorting_problem.sort();
}

// checks
console.log(...custom_sort([2])); // 2
console.log(...custom_sort([2,1,3,0,8])); // 0,1,2,3,8
