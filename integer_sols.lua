-- Problem X: find integer solutions (x, y)
-- x > 0
-- x/n < y <= x/n + 1/x
--
-- x equiv m (mod n)
-- then x/n = integer + m/n
-- so the next greatest integer is (n-m)/m away
-- so... if x > m/(n-m), there are no solutions

-- Problem Y: find integer solutions (x, y, z)
-- x^2 + y^2 + z^2 < n^2

local Problem_y = {
	n = 4,
}
function Problem_y:solve() = function(){
	for x=-self.n,self.n do
		local fixed_x_problem_y = setmetatable({x=x}, {__index = self})
		fixed_x_problem_y.solve_for_fixed_x()
	end
}
function Problem_y:solve_for_fixed_x() = function(){
	local r = sqrt(r^2 - x^2)
	for y=-r,r do
		local fixed_xy_problem_y = setmetatable({y=y}, {__index = self})
		fixed_xy_problem_y.solve_for_fixed_xy()
	end
}
