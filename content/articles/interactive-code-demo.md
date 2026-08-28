---
title: "Interactive Code Demo"
description: "Testing our new interactive code playgrounds directly in the browser!"
date: "2026-08-27"
author: "Editor"
category: "Engineering"
tags: ["AI", "Playground", "Interactive"]
---

# Interactive Code Evaluation

We've built a new feature that lets you run JavaScript directly inside the article. Try clicking the green **Run** button on the snippet below!

```javascript
// A simple function to calculate the nth Fibonacci number
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Starting calculation...");
for (let i = 0; i < 10; i++) {
  console.log(`Fibonacci(${i}) =`, fibonacci(i));
}
console.log("Finished!");
```

Try modifying this in the future if we add editable fields! For now, it evaluates the static code to prove the simulated console works perfectly.
