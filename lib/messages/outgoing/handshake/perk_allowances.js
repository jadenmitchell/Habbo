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

const outgoing = require('../outgoing');
const OutgoingPacket = require('../outgoing_packet');

class PerkAllowancesComposer extends OutgoingPacket {
    constructor() {
        super(outgoing.perkAllowancesMessageComposer);
        super.writeInt(9); // Count
        super.writeString('SAFE_CHAT');
        super.writeBoolean(true);
        super.writeString(''); // requirement.unfulfilled.safety_quiz_1
        super.writeString('USE_GUIDE_TOOL');
        super.writeBoolean(false);
        super.writeString('requirement.unfulfilled.helper_le');
        super.writeString('GIVE_GUIDE_TOURS');
        super.writeBoolean(false);
        super.writeString(''); // ??
        super.writeString('JUDGE_CHAT_REVIEWS');
        super.writeBoolean(false);
        super.writeString(''); // ??
        super.writeString('CALL_ON_HELPERS');
        super.writeBoolean(false);
        super.writeString(''); // ??
        super.writeString('CITIZEN');
        super.writeBoolean(true);
        super.writeString(''); // ??
        super.writeString('FULL_CHAT');
        super.writeBoolean(true);
        super.writeString(''); // ??
        super.writeString('TRADE');
        super.writeBoolean(true);
        super.writeString(''); // ??
        super.writeString('VOTE_IN_COMPETITIONS');
        super.writeBoolean(false);
        super.writeString('requirement.unfulfilled.helper_level_2');
    }
}

module.exports = PerkAllowancesComposer;