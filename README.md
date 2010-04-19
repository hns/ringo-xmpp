# Ringo-XMPP

Ringo-XMPP is a package for writing server-side Jabber components and bots in RingoJS.
It is based on the [Tinder](http://www.igniterealtime.org/projects/tinder/index.jsp)
and [Whack](http://www.igniterealtime.org/projects/whack/index.jsp) libraries from
Jive Software. It is also inspired by Matthew Wild's
[xmppjs](http://github.com/mwild1/xmppjs) project, from which I thankfully borrowed
a part of this README file.

To install ringo-xmpp as a RingoJS package run the following command:

    ringo-admin install hns/ringo-xmpp

This package lets you write server-side XMPP components that handle all XMPP traffic
to a specific domain or subdomain. All incoming XMPP packets (called stanzas in XMPP
terminology) directed to that domain (e.g. "service.example.org") or an entity in that
domain ("user@service.example.org") will be routed to the component. The component
can in turn send any XMPP packets to any client.

To run the example script, you need an XMPP/Jabber server that supports
[external components](http://xmpp.org/extensions/xep-0114.html). I recommend
[Prosody](http://prosody.im/) server which is written in Lua, has few dependencies,
is lightweight and easy to configure.

If you have a local Prosody server running, add the following to its configuration file:

        component_ports = 5347

        Component "test.localhost"
            component_secret = "foo"

After restarting Prosody try running:

    ringo examples/echo.js

Connect to your Prosody with a Jabber client and send a message to echo.localhost or
anything@echo.localhost - you should receive an instant response back - congratulations!
