const Action = require('./Action');
const Constants = require('../../util/Constants');
const cloneObject = require('../../util/CloneObject');

class ChannelUpdateAction extends Action {

  handle(data) {
    const client = this.client;
    const channel = client.channels.get(data.id);

    if (channel) {
      const oldChannel = cloneObject(channel);
      channel.setup(data);
      if (!oldChannel.equals(data)) {
        client.emit(Constants.Events.CHANNEL_UPDATE, oldChannel, channel);
      }

      return {
        old: oldChannel,
        updated: channel,
      };
    }

    return {
      old: null,
      updated: null,
    };
  }
}

/**
* Emitted whenever a channel is updated - e.g. name change, topic change.
*
* @event Client#channelUpdate
* @param {Channel} oldChannel the channel before the update
* @param {Channel} newChannel the channel after the update
*/

module.exports = ChannelUpdateAction;
