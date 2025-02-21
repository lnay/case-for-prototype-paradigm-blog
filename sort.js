let _merge_sort_problem = {
  // Attributes relating to the context of the problem
  // (to be populated in problem objects)
  list: undefined, // list containing slice that we want to sort
  start: undefined, // index of start of slice we want to sort
  end: undefined, // index of end of slice we want to sort

  // object method solving the problem at hand
  // i.e. performing a merge-sort
  sort: function* () {
    // Base case (sorting 1 element):
    if (this.start == this.end) {
      yield this.list[this.start];
      return;
    }

    // create "subproblems" for sorting the first half (left)
    // and second half (right) of the list
    // ... by creating new objects with with current object
    // as prototype, and then adjust the problem parameters
    // which are different
    const mid = Math.floor((this.start + this.end) / 2);
    const left = { end: mid, __proto__: this };
    const right = { start: mid + 1, __proto__: this };

    // solve the subproblems
    let sorted_left = left.sort();
    let sorted_right = right.sort();

    // standard merge-sort procedure...
    let next_smallest_left = sorted_left.next();
    let next_smallest_right = sorted_right.next();

    while (!next_smallest_left.done && !next_smallest_right.done) {
      if (next_smallest_left.value > next_smallest_right.value) {
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
  },
};

function custom_sort(input_list) {
  return {
    list: input_list,
    start: 0,
    end: input_list.length - 1,
    __proto__: _merge_sort_problem,
  }.sort();
}

// checks
console.log(...custom_sort([2])); // 2
console.log(...custom_sort([2, 1, 3, 0, 8])); // 0,1,2,3,8
