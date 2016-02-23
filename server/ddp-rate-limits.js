DDPRateLimiter.addRule({
        type: 'method',
        name: 'addChat',
        connectionId: function() { return true; }   // Rate limit per connection ID
    }, 
    5, 
    1000
);

