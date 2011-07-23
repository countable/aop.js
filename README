aop.js
======

Implicit events and aspect oriented programming (AOP).

Amusing Background
------------------

I attended day one of a compiler design course taught by Gregor Kiczales. Not knowing he was the originator of AOP,
I shared my opinion that I disliked the notation used by his implementation, AspectJ. After a moment of tension, he proceeded to tell me
that we were stuck with this sort of notation until we were to "start from scratch" (referring to syntax paradigms, I'm left to suppose).

I dropped the course and took graphics instead, so be forwarned: I may not know anything about aspect oriented programming.

Implicit Events
---------------

Certain frameworks let us have custom events, something like this:
```
some_observable = new Observable({
    events: ['custom_event']
});

some_observable.on('custom event', function(){
    respond_to_event();
    // ...
}, scope);

observable.fireEvent('custom event');
```

Without having certain heavy frameworks, aop.js gives you something nearly equivalent, but more flexible:
```
some_function = AOP(function(){
    
})

some_function.on(function(){
    respond_to_event();
});

some_function();
```

That is, your custom event fires implicitly when your function is called. This particular behaviour is the part of AOP I've found useful.
However, in an attempt to do some justice to traditional AOP, here's some VERY BASIC "crosscutting", which is a core part of the AOP paradigm.

```
animalRenderer = {
    drawDog: function(){
        // queue a dog shape to be rendered.
    },
    
    drawHorse: function(){
        // queue a horse shape to be rendered.
    }
};

// Automatically perform graphics processing without draw() functions knowing about it.
AOP.crosscut(animalRenderer, /^draw.*/, {

    cb:function(){
        // apply queued changes to canvas.
    },
    
    when: 'after'
    
});
```