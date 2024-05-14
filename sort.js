let _merge_sort_problem = {
	// Attributes relating to the context of the problem
	// (to be populated later)
	list: undefined,
	start: undefined,
	end: undefined,

	// object method solving the problem at hand
	// i.e. performing a merge-sort
	sort: function*() {
		if (this.start == this.end) {
			yield this.list[this.start];
			return;
		}

		// create "subproblem" for sorting the first half (left)
		// and second half (right) of the list
		const mid = Math.floor((this.start + this.end) / 2);
		let left = Object.create(this);
		left.end = mid;
		let right = Object.create(this);
		right.start = mid + 1;

		let sorted_left = left.sort();
		let sorted_right = right.sort();

		let next_smallest_left = sorted_left.next();
		let next_smallest_right = sorted_right.next();

		// standard merge-sort procedure...
		while (!next_smallest_left.done && !next_smallest_right.done) {
			if(next_smallest_left.value > next_smallest_right.value) {
				yield next_smallest_right.value;
				next_smallest_right = sorted_right.next();
			} else {
				yield next_smallest_left.value;
				next_smallest_left = sorted_left.next();
			}
		}
		if (next_smallest_left.done) {
			// no more on left, yield the rest of right side
			yield next_smallest_right.value;
			yield* sorted_right;
		} else if (next_smallest_right.done) {
			// ... vice versa
			yield next_smallest_left.value;
			yield* sorted_left;
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
