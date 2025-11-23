







import { TopicNode } from '../types';

export const UNIT_0_LIMITS_CHILDREN: TopicNode[] = [
  {
    id: 'intro-limits',
    title: 'Introduction to Limits',
    type: 'category',
    children: [
      { 
        id: 'limit-1', 
        title: '1. Motivation', 
        type: 'topic',
        content: `### Motivation

Calculus has two main concepts—the **derivative** and the **integral**.
But in order to understand either of them, you first have to understand **limits**.
So let's talk limits.

#### The Derivative
We'll start with a curve.
Fix a point A on the curve.
Choose a second point, B, which we're going to move.
And draw a line through A and B. Let's look at what happens when B moves closer and closer to the point A.
This is an example of a limit.
In the limit, the line becomes tangent to the curve at the point A. The slope of this line is the derivative at the point A. 

#### The Integral
Now let's see how limits are related to integrals.
Integrals are used to measure areas of curvy regions like this.
Measuring areas of curvy regions seems hard, but measuring areas of rectangles is easy, so we'll try to fill our region with rectangles.
Each rectangle has a certain width.
As we make the width smaller, the total area of the rectangles gets closer and closer to the area of the curvy region.
The integral is the limit of the total area of the rectangles as the width tends to zero.

So that's why we start with limits.
They're the foundation for everything else in calculus.
At the beginning, limits may seem abstract, but very quickly you'll get used to them.

---
*End of transcript.*`
      },
      { 
        id: 'limit-2', 
        title: '2. Introduction to limits', 
        type: 'topic', 
        content: `### Objectives

At the end of this sequence, and after some practice, you should be able to:

* Use a calculator to determine right and left hand limits.
* Identify right and left hand limits based on graphs.
* Determine if a limit exists based on values of right and left hand limits.
* Understand that the limit does not depend on the value of a function at the point of interest.

### Contents: 14 pages

* 6 videos (24 minutes 1x speed)
* 17 questions`
      },
      { 
        id: 'limit-3', 
        title: '3. Moving closer and closer', 
        type: 'topic',
        content: `### Moving closer and closer

Welcome. Calculus is all about functions. You probably know that a function f takes an input x and gives an output f of x. But in calculus, we're not concerned with just one input and finding the output for that one input. We want to consider a whole range of inputs. So we would want to know what happens when the input "moves" or "varies."

For instance, we could ask what happens as the input moves really close. Closer and closer to some point. Let's say 1. And to be even more specific, let's say that x is moving towards 1 from the left. So if this is a number line, and we've got the point 1 right there, then x could start here, and just move closer and closer and closer towards 1, from the left.

We'll use this arrow notation to denote that x is getting really, really close to 1. But a warning, this does not mean that x will ever actually equal 1. We're only concerned with values of x that are near one.

OK. Now that that's said, as x moves, we know that the output f of x is also going to move. And so the question that we can ask is as x moves closer and closer to 1 from the left, does f of x move closer and closer to some value of its own?

Let's be concrete here. And pick a particular function f. I'm going to choose f of x to be the square root of 3 minus 5 x plus x squared, plus x cubed, all over x minus 1. Kind of a complicated function, but you'll have to trust me that this is a good example. And what we can do in order to see what's happening to f as x approaches 1 from the left is just select certain values of x that are getting closer and closer to 1 from the left.

So over here on the number line, we could start with x equals zero. And then they get closer, we could try x equals 0.5. Or even closer, maybe 0.9. Even 0.99. These sorts of values. And we want to know, what's happening to the output? So we can just plug these values into the function, and see whether the output gets closer and closer to anything.

Now there are technically infinitely many values of x that we could have chosen here. But let's just start with these four. Remember though that one value of x that we will definitely not consider is x equal to 1 itself. In fact, this function isn't even defined at x equals 1. We'd have a zero denominator. It is, however, defined when x is approaching one, and those are the values we're considering.

OK. Well let's make a table with our chosen inputs and the associated outputs, and let's just calculate those outputs. So when we plug in zero we'll get a square root of 3 on top divided by minus 1. So minus square root of 3, which is roughly minus 1.73.

Next up is x equals 0.5. I'm going to have to bust out the calculator here. So we've got 3 minus 5 times 0.5 plus 0.5 squared plus 0.5 cubed, and then we need the square root, and then we need to divide by 0.5 minus 1. So 0.5 negative. So we get minus 1.87, roughly.

So back to our table. We've got f of x moving from minus 1.73 to minus 1.87. Well that's not really enough data to tell if f is getting closer and closer to anything in particular. So let's take our next two values of x and plug those in.

I'm going to fast forward through the calculations. You ready? x equals 0.9. All right? That's approximately minus 1.97, and finally 0.99, and we've got minus 1.997. So as we go down this table, f of x is getting really, really close to what looks like minus 2. So we can say that as x approaches 1 from the left, f of x approaches minus 2.

Now f of x might never actually equal to minus 2, just as x never actually equals one, but it gets really, really close. And if it gets arbitrarily close, meaning as close as we could possibly want, then that's really all we'll care about.

What I would like you to do now is to do this same exercise, except this time have x approach 1 from the right. You might be surprised at what you find. We'll talk afterwards.

---
*End of transcript.*`
      },
      { 
        id: 'limit-4', 
        title: '4. One-sided limits', 
        type: 'topic',
        content: `### One-sided limits

Welcome back.
We've been thinking about this function.
And in the last video, we took some values
of x that were approaching 1 from the left,
and we made this table.
And we saw that as x approached 1
from the left, f of x approached minus 2.
So remember, these arrows mean approaching.
And this minus sign up here, that
signifies that we're coming at 1 from the left,
or from the negative direction.
This is not the same as negative 1.
x is actually approaching positive 1.
It's just that x is coming from the negative direction.
And as it does that, f of x is approaching negative 2.
What you were supposed to do was the same thing,
just on the other side.
So you should have picked out some values and made a table.
Now, you didn't have to choose these particular values.
But you should have chosen some similar looking ones
and gotten a similar looking table.
And what we see from the table is
that as x approaches 1 from the right,
f of x approaches 2, positive 2, not negative 2.
So we've got something different going on on the right side of 1
versus the left side of 1.
Pretty cool.
Let's see what this looks like on the graph of f.
All of these data points that we have will help us get started.
For instance, on the right here, we've got f of 2 equals 2.24.
So the point (2, 2.24) is on the graph.
And we can do the same thing with these other three points
that are on the right.
And they'll look like this.
Now, it seems reasonable to assume that the graph of f
is going to behave pretty smoothly in between these four
points.
So we can just draw it like this.
And once we've done that, then we can look and see
what happens as x approaches 1 from the right, what's
happening to f of x and what's happening to these y values.
Well, like we said, they're approaching
the level y equals 2.
What happens exactly at x equals 1?
Well, remember that f of 1 isn't defined.
We would have a 0 denominator, which
means that there is no point on the graph where
the x-coordinate is 1.
So we're going to put this open circle here
to remind us that this point, (1, 2)
is not actually on the graph.
But that's OK.
If we're just talking about x approaching 1,
that means we only care about values of x that are near 1,
not equal to 1.
We can do the same thing on the left.
Our table of values gives us these four points.
And if we interpolate and assume the graph
is smooth in between those points, then we've got this.
And as we come in towards 1 from the left with our x values,
then our y values are approaching y equals minus 2.
And again, we'll have this open circle
to remind us that there is no point at x equals 1
on the graph.
OK, let me make some space here.
And we want to give an official name
for this phenomenon of a function's value
approaching something.
We're going to call this a limit.
So on the right here, we're going
to say that the limit of f of x as x approaches 1
from the right is 2.
And the notation for this is as follows.
Limit of f of x as x approaches 1 from the right is 2.
This is often called the right-sided limit
or the right-hand limit at the point x equals 1.
And we have a similar thing on the left.
We can write the limit of f of x as x approaches 1
from the left equals minus 2.
And there we have it.
We've got our left-hand limit, and we've
got our right-hand limit.
We have the notation, we have the meaning,
and we know what it looks like in pictures.
So this is our left-handed limit.
And here's our right-handed limit.
So that's our first function.
Kind of an interesting little function, isn't it?
We have a couple short questions for you.
And then we have a few more functions for you
to play around with left- and right-hand limits.
And maybe those will be even more interesting.
So why don't you go and find out?

---
*End of transcript.*`
      },
      { id: 'limit-5', title: '5. Definitions of right-hand and left-hand limits', type: 'topic' },
      { id: 'limit-6', title: '6. A few more limits', type: 'topic' },
      { 
        id: 'limit-7', 
        title: '7. Possible limit behaviors', 
        type: 'topic',
        content: `### Possible Limit Behaviors

You've now seen a variety of limits. In our last video, we looked at a function f whose limit as x approached a point a from the right was equal to 2. And to it looked something like this. And the limit from the left as x approached a was minus 2. So it looked something like this.

So we know that the right- and the left-hand limits at a point don't have to agree, but they could agree. One of the examples that you looked at was like that. That was the function that we called g. There we had the left-hand limit equal to 1/2. So the graph would look like this. And the right-hand limit was also equal to 1/2. So the graph would look something like that.

There are many possible limit behaviors:

*   The right-hand and left-hand limits may both exist and be equal.

*   The right-hand and left-hand limits may both exist, but may fail to be equal.

*   A right- and/or left-hand limit could fail to exist due to blowing up to ±∞. (Example: Consider the function 1/x near x=0.) In this case, we either say the limit blows up to infinity. We also say that the limit does not exist because ∞ is not a real number!

*   A right- and/or left-hand limit could fail to exist because it oscillates between many values and never settles down. In this case we say the limit does not exist.

---
*End of transcript.*`
      },
      { id: 'limit-8', title: '8. Quick limit questions', type: 'topic' },
      { id: 'limit-9', title: '9. The overall limit', type: 'topic' },
      { 
        id: 'limit-10', 
        title: '10. Limit definition', 
        type: 'topic',
        content: `### Limit definition

**The Limit in Words**

If a function $f(x)$ approaches some value $L$ as $x$ approaches $a$ from *both the right and the left*, then **the limit** of $f(x)$ exists and equals $L$.

**The Limit in Symbols**

If
$$ \\lim_{x \\to a^+} f(x) = \\lim_{x \\to a^-} f(x) = L $$

then
$$ \\lim_{x \\to a} f(x) = L. $$

Alternatively,
$$ f(x) \\to L \\quad \\text{as} \\quad x \\to a. $$

Remember that $x$ is approaching $a$ but does not equal $a$.

---

### Formal definition of limit

Formally, the statement $\\lim_{x \\to a} f(x) = L$ is defined as:

For all $\\epsilon > 0$, there exists some $\\delta > 0$ such that if $0 < |x - a| < \\delta$, then $|f(x) - L| < \\epsilon$.

As is traditional, we use the Greek letters $\\epsilon$ and $\\delta$.

Here is how one might understand that statement. The distance between two numbers $y$ and $z$ is given by $|y - z|$. Thus, the very last part of the definition is saying that the distance from $f(x)$ to $L$ is less than $\\epsilon$; one should think of $\\epsilon$ as representing a small distance. This close distance occurs if $0 < |x - a| < \\delta$; that is, if $x$ is within some distance $\\delta$ from $a$, but not necessarily if that distance is 0 (we don't care about $x = a$ itself).

The "for all" and "there exists" clauses have to do with how small these distances need to get. We want $f(x)$ to eventually get arbitrarily close to $L$, so this statement needs to be satisfied no matter how small $\\epsilon$ gets. Given any choice of $\\epsilon$, we can satisfy the condition $|f(x) - L| < \\epsilon$ as long as $x$ gets close enough to $a$; the proximity required is measured by $\\delta$.` 
      },
      { 
        id: 'limit-11', 
        title: '11. Limits from graphs', 
        type: 'topic',
        content: `### Estimate Limits

In this section, you will test your skills by reading limits directly from a graph.

**Key things to look for:**
*   **Solid Dots:** The function value exists at this point.
*   **Open Circles (Holes):** The function value is undefined or discontinuous here, but the limit might still exist.
*   **Broken Lines (Jumps):** Where the left road and right road don't meet.
*   **Vertical Asymptotes:** Where the function shoots up or down to infinity.

Use the **Visual Guide** to explore the graph, then switch to the **Quiz Game** to solve the specific limit problems at $x = -2$, $x = 1$, and $x = 3$.`
      },
      { 
        id: 'limit-12', 
        title: '12. Review problems', 
        type: 'topic',
        content: `### Review Problems

This section consolidates everything you've learned about limits so far. 

**Key Concepts to Review:**

1.  **Function vs. Limit:** Does the existence of a point $f(a)$ guarantee a limit exists? (Hint: Think about holes and jumps).
2.  **Double-Sided Limits:** What must be true about the Left Limit ($L^-$) and Right Limit ($L^+$) for the overall limit to exist?
3.  **The Floor Function:** A classic example of a step function. Use the **Visual Guide** to walk the stairs and see why the limit fails at integers.

Visit the **Quiz Game** to solve the graded problems for this section.`
      },
      { 
        id: 'limit-13', 
        title: '13. Limit laws', 
        type: 'topic',
        content: `### Limit Laws

If you know the limits of two separate functions, you can find the limit of their sum, difference, product, or quotient.

Suppose that:
$$ \\lim_{x \\to a} f(x) = L \\quad \\text{and} \\quad \\lim_{x \\to a} g(x) = M $$

Then the following laws hold:

1.  **Addition:**
    $$ \\lim_{x \\to a} [f(x) + g(x)] = L + M $$
2.  **Subtraction:**
    $$ \\lim_{x \\to a} [f(x) - g(x)] = L - M $$
3.  **Multiplication:**
    $$ \\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M $$
4.  **Division:**
    $$ \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M} \\quad (\\text{if } M \\neq 0) $$

**Why does this work?**
If $f(x)$ is close to $L$ (say $L + \\epsilon_1$) and $g(x)$ is close to $M$ (say $M + \\epsilon_2$), then their sum is close to $L + M + (\\epsilon_1 + \\epsilon_2)$. As the errors $\\epsilon_1$ and $\\epsilon_2$ shrink to zero, the sum approaches $L+M$ exactly.

Use the **Visual Guide** to see the "Teamwork" of functions, and visit the **Quiz Game** to test your knowledge of these rules.
`
      },
      { 
        id: 'limit-14', 
        title: '14. Limit Laws (Advanced)', 
        type: 'topic',
        content: `### Advanced Limit Laws & Justifications

Suppose $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$.

Then we get the following Limit Laws:

1.  **Limit Law for Addition:**
    $$ \\lim_{x \\to a} [f(x) + g(x)] = L + M $$

2.  **Limit Law for Subtraction:**
    $$ \\lim_{x \\to a} [f(x) - g(x)] = L - M $$

3.  **Limit Law for Multiplication:**
    $$ \\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M $$

4.  **Limit Law for Division (Part 1):**
    If $M \\neq 0$, then:
    $$ \\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\frac{L}{M} $$
    *(We will discuss what happens when $M = 0$ in a later section!)*

---

### Justifying the Limit Law for Multiplication

We can rigorously prove the Multiplication Law using error terms.

If $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$, then we can write:

$$ f(x) = L + \\epsilon_1 $$
$$ g(x) = M + \\epsilon_2 $$

where $\\epsilon_1, \\epsilon_2 \\to 0$ as $x \\to a$. The symbol $\\epsilon$ (epsilon) represents the tiny "error" or distance between the function value and its limit.

Then, when we multiply them:

$$ f(x)g(x) = (L + \\epsilon_1)(M + \\epsilon_2) $$
$$ f(x)g(x) = LM + \\epsilon_1 M + \\epsilon_2 L + \\epsilon_1 \\epsilon_2 $$

As $L$ and $M$ are constants, and $\\epsilon_1, \\epsilon_2$ tend to zero, all three error terms ($\\epsilon_1 M, \\epsilon_2 L, \\epsilon_1 \\epsilon_2$) will go to zero as $x$ approaches $a$. 

Hence,
$$ \\lim_{x \\to a} [f(x) \\cdot g(x)] = L \\cdot M $$

Use the **Visual Guide** to explore the geometric proof of this expansion.` 
      },
      { 
        id: 'limit-15', 
        title: '15. Summary', 
        type: 'topic',
        content: `### Summary

**Definitions of right-hand and left-hand limits**

Suppose $f(x)$ gets really close to $R$ for values of $x$ that get really close to (but are not equal to) $a$ from the right. Then we say $R$ is the **right-hand limit** of the function $f(x)$ as $x$ approaches $a$ from the right.

We write:
$$ \\lim_{x \\to a^+} f(x) = R $$

If $f(x)$ gets really close to $L$ for values of $x$ that get really close to (but are not equal to) $a$ from the left, we say $L$ is the **left-hand limit**.

We write:
$$ \\lim_{x \\to a^-} f(x) = L $$

---

**Possible limit behaviors**

There are many possible behaviors:
1.  Left and Right limits exist and are equal.
2.  Left and Right limits exist but are NOT equal.
3.  One or both limits blow up to infinity.
4.  One or both limits oscillate wildly.

**Definition of the Limit**

If a function $f(x)$ approaches some value $L$ as $x$ approaches $a$ from *both the right and the left*, then **the limit** of $f(x)$ exists and equals $L$.

In symbols:
$$ \\lim_{x \\to a} f(x) = L \\iff \\lim_{x \\to a^-} f(x) = \\lim_{x \\to a^+} f(x) = L $$

---

**The Limit Laws**

Suppose $\\lim_{x \\to a} f(x) = L$ and $\\lim_{x \\to a} g(x) = M$.

*   **Addition:** $\\lim [f(x) + g(x)] = L + M$
*   **Subtraction:** $\\lim [f(x) - g(x)] = L - M$
*   **Multiplication:** $\\lim [f(x) \\cdot g(x)] = L \\cdot M$
*   **Division:** $\\lim \\frac{f(x)}{g(x)} = \\frac{L}{M}$ (if $M \\neq 0$)
`
      },
    ]
  }
];
