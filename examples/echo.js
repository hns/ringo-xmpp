var {Connection, message, presence} = require("ringo/xmpp");

var conn = new Connection();
conn.addComponent("echo.localhost", "secret", {
    // send back any messages received
    handleMessage: function(msg) {
        if (msg.body != null) {
            this.send(message({
                to: msg.from,
                from: msg.to,
                thread: msg.thread,
                type: msg.type,
                body: msg.body
            }));
        }
    },
    // approve and return any subscription requests we get
    handlePresence: function(pres) {
        if (pres.type == "subscribe") {
            // first, let them know we accept subscription
            this.send(presence({
                type: "subscribed",
                to: pres.from,
                from: pres.to
            }));
            // then, tell them we want to subscribe, too
            this.send(presence({
                type: "subscribe",
                to: pres.from,
                from: pres.to
            }));
        } else if (pres.type == "unsubscribe") {
            this.send(presence({
                type: "unsubscribed",
                to: pres.from,
                from: pres.to
            }));
            this.send(presence({
                type: "unsubscribe",
                to: pres.from,
                from: pres.to
            }));
        } else if (pres.type == null) {
            // reply to presence without a type to set our state to online
            this.send(presence({
                to: pres.from,
                from: pres.to
            }));
        }
    }
});

require("ringo/shell").start();
