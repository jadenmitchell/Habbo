const Incoming = require('./../incoming');

function getSoundSettings(session, packet) {
}

/**
 * @interface
 * @type {getSoundSettings}
 */
module.exports.handle = getSoundSettings;

/**
 * @interface
 * @type {Number}
 */
module.exports.serial = Incoming.GetSoundSettingsEvent;