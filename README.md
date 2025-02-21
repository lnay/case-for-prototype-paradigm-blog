# A Use Case For the Prototype-Based Paradigm: divide and conquer

Most programmers have taken classes on object-oriented programming (OOP).
Many are also aware of functional patterns, either from catching lisps,
riding OCamls, learning themselves a Haskell;
or maybe they've used functional features which have been becoming popular
in mainstream languages.

Imperative, event-oriented, declarative... these were all paradigms featuring in
my AQA textbook back in school.
But one paradigm that I never heard of until I came across it in Bruce Tate's
book "Seven languages in seven weeks", was the so-called **"prototype-based paradigm"**.
The example language in the book was an esoteric language called `io`, however the
book was quick to mention that the (most?) popular language (in the world?) JavaScript also has
a prototype-based system for its objects.

Natural questions after learning this are:
1. What's the point of **prototype-based** programming?
2. Is it *just* object-oriented programming in a dynamically typed language?
3. Is there anything that is more natural to express in a **prototype-based** way?

At first I assumed that the answers were:
1. It's an implementation detail
2. Yes
3. Maybe...

But then when writing a computation library for a problem in pure mathematics,
it occured to me that the pattern I was trying to create might be actually be
more suited to a prototype-based paradigm.
Leading me to come up with the not-so-short slogan:
> Prototype-based programming can be a good fit for divide-and-conquer
> algorithms; by using objects to store the parameters of a problem,
> to be used as prototypes for the subproblems we have divided up.

## What does prototype-based mean?

First thing is first: what is unique about the prototype-based model?
In this model, any object has a (possibly empty) "prototype".
And a prototype is an object itself which can have its own prototype.
There is not fundamentally a "class" of an object,
however some objects could be treated as such and use some naming
convention (i.e. capitalisation) to denote this.
But on a base level whenever you "pass a message" to an object
(read in OOP terminology: access an attribute or method),
the object attempts to resolve the message itself, if it cannot
(read: the attribute or method was not defined on that object),
then the message in passed onto its prototype to resolve recursively.

DIAGRAM

CODE TO CREATE OBJECTS FROM DIAGRAM (maybe in different languages)

### OOP comparison

In statically typed compiled (to binary or bytecode)
languages with OOP such as C#, C++, Java...
classes are determined at compile time;
which in particular means that one could count them from the source code alone.
Whereas objects to be used as prototypes in the later examples in this post
can be created dynamically at run time indefinitely.

As well as this technical difference, OOP comes with some more baggage in the
form of some extra constructs not present in the prototype-based model:
- constructors
- destructors (when there is no garbage collector)
- static items belonging to the class, not the objects (no distinction in prototype model)
- overrides done by classes instead of objects
- ...

Python also allows for classes to be created dynamically
(commonly done by decorators), but also adheres to OOP constructs and
replicating the later examples in this post is difficult.

## Quick example (lua)

To start with a short, contrived, illustrative example, consider the following problem:
**Given an integer $n$, what are the points $(x,y)$ with integer coordinates which are within a distance $n$ from the $(0,0)$?**

...

### closing remarks on this example

This example only had a single object which was used as a prototype, and really
could have just as easily been expressed with OOP by defining one class for the
base problem, and a second class for the subproblems with a fixed $x$-value.

However there is a potential here to generalise this program to arbitrary
dimensions, determined by user-input;
whereas the OOP alternative would rely on a class being defined for each dimension,
which cannot be done in statically typed languages as remarked upon earlier.

That being said, the next example is possibly better for the point made in this post,
and also uses a more popular language,
at the cost of being a little long.

## Merge-sort example (JavaScript)


### closing remarks on this example

The ergonomic difference (i.e. the only thing that *really* matters)
between the prototype-based implementation of merge-sort here
and the more traditional recursive implementation,
is that the parameters of the problem are put into an object as opposed to passed as
arguments to the recursive function calls.
In essence, the function stack frames in the recursive implementation would be analogues
of the objects in the prototype-based implementation.
This can give slightly more concise code when the specialised problem only changes/adds
a small amount of the context parameters (here either `start` or `end` is modified only).
This benefit only increases for bespoke problems with larger amounts of context
(this was in the case for the problem which inspired me to write this post).

## Any take-away for statically typed languages? (Rust example)

As mentioned earlier, statically typed languages cannot have classes defined at
run time, ruling out the possibility of mimicking the JavaScript example above in Rust.
However the first example (in lua) only requires two classes, so let's consider
a more complicated version of that problem (**mathematics trigger warning**):

**Given an integer $n$,
find integer solutions $(x, y)$ such that**
- $x > 0$
- $\frac{x}{n} < y \leq \frac{x}{n} + \frac{1}{x}$

GRAPH

TBC...
