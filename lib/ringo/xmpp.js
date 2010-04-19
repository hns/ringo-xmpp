/**
 * @fileOverview A package for writing XMPP components and bots in RingoJS.
 */

export('Connection', 'message', 'presence');

var {AbstractComponent} = org.xmpp.component;
var {JID, Message, Presence} = org.xmpp.packet;
var {ExternalComponentManager} = org.jivesoftware.whack;

/**
 * A connection to an XMPP server for deploying external components.
 */
function Connection(host, port) {
    host = host || "localhost";
    port = port || 5347;
    var manager = new ExternalComponentManager(host, port);

    this.addComponent = function(domain, secret, callbacks) {
        var component = new AbstractComponent(callbacks);
        manager.setSecretKey(domain, secret);
        manager.addComponent(domain, component);
        return component;
    }
}

function message(properties) {
    return createPacket(Message, properties);
}

function presence(properties) {
    return createPacket(Presence, properties);
}

function createPacket(ctor, properties) {
    var packet = new ctor();
    if (properties) {
        for (var key in properties) {
            switch (key) {
                case "type":
                    // map string "subscribe" to org.xmpp.packet.Presence.Type.subscribe
                    var type = properties[key];
                    packet[key] = (type instanceof ctor.Type) ?
                            type : ctor.Type[type];
                    break;
                /* case "to":
                case "from":
                    var jid = properties[key];
                    msg[key] = jid instanceof JID ? jid : new JID(String(jid));
                    break; */
                default:
                    packet[key] = properties[key];
                    break;
            }
        }
    }
    return packet;
}

