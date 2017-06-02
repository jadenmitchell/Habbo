/**
 * Copyright 2016 Jaden M.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const incoming = {};
incoming.versionCheckMessageEvent = 4000;
incoming.initDiffieHandshakeMessageEvent = 1525;
incoming.completeDiffieHandshakeMessageEvent = 3557;
incoming.uniqueIDMessageEvent = 3786;
incoming.ssoTicketMessageEvent = 1887;
incoming.infoRetrieveMessageEvent = 3897;
incoming.getCreditsInfoEvent = 184;
incoming.getSoundSettingsEvent = 3206;
incoming.getFurnitureAliasesMessageEvent = 2403;
incoming.getRoomEntryDataMessageEvent = 2589;
incoming.messengerInitMessageEvent = 2959;
incoming.getUserFlatCatsMessageEvent = 2232;
incoming.getBuddyRequestsMessageEvent = 66;
incoming.getRoomVisitsMessageEvent = 3893;
incoming.initGameCenterEvent = 396;
incoming.promotedRoomsEvent = 569;
incoming.getUserFlatCatsMessageEvent = 2232;
incoming.getHabboGroupBadgesMessageEvent = 243;
incoming.myRoomsSearchMessageEvent = 2606;
incoming.openFlatConnectionMessageEvent = 3056;

module.exports = incoming;