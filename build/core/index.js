"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpPublicSignalsPrefix = exports.signUpProofPrefix = exports.reputationPublicSignalsPrefix = exports.reputationProofPrefix = exports.epkPublicSignalsPrefix = exports.epkProofPrefix = exports.identityCommitmentPrefix = exports.identityPrefix = exports.DEFAULT_TREE_DEPTHS_CONFIG = exports.DEFAULT_ATTESTING_FEE = exports.DEFAULT_EPOCH_LENGTH = exports.DEFAULT_MAX_EPOCH_KEY_NONCE = exports.DEFAULT_ETH_PROVIDER = exports.maxReputationBudget = exports.defaultCommentReputation = exports.defaultPostReputation = exports.defaultAirdroppedReputation = exports.deployUnirepSocial = exports.UnirepSocialContract = void 0;
const UnirepSocialContract_1 = require("./UnirepSocialContract");
Object.defineProperty(exports, "UnirepSocialContract", { enumerable: true, get: function () { return UnirepSocialContract_1.UnirepSocialContract; } });
const utils_1 = require("./utils");
Object.defineProperty(exports, "deployUnirepSocial", { enumerable: true, get: function () { return utils_1.deployUnirepSocial; } });
const socialMedia_1 = require("../config/socialMedia");
Object.defineProperty(exports, "defaultAirdroppedReputation", { enumerable: true, get: function () { return socialMedia_1.defaultAirdroppedReputation; } });
Object.defineProperty(exports, "defaultPostReputation", { enumerable: true, get: function () { return socialMedia_1.defaultPostReputation; } });
Object.defineProperty(exports, "defaultCommentReputation", { enumerable: true, get: function () { return socialMedia_1.defaultCommentReputation; } });
Object.defineProperty(exports, "maxReputationBudget", { enumerable: true, get: function () { return socialMedia_1.maxReputationBudget; } });
const defaults_1 = require("../cli/defaults");
Object.defineProperty(exports, "DEFAULT_ETH_PROVIDER", { enumerable: true, get: function () { return defaults_1.DEFAULT_ETH_PROVIDER; } });
Object.defineProperty(exports, "DEFAULT_MAX_EPOCH_KEY_NONCE", { enumerable: true, get: function () { return defaults_1.DEFAULT_MAX_EPOCH_KEY_NONCE; } });
Object.defineProperty(exports, "DEFAULT_EPOCH_LENGTH", { enumerable: true, get: function () { return defaults_1.DEFAULT_EPOCH_LENGTH; } });
Object.defineProperty(exports, "DEFAULT_ATTESTING_FEE", { enumerable: true, get: function () { return defaults_1.DEFAULT_ATTESTING_FEE; } });
Object.defineProperty(exports, "DEFAULT_TREE_DEPTHS_CONFIG", { enumerable: true, get: function () { return defaults_1.DEFAULT_TREE_DEPTHS_CONFIG; } });
const prefix_1 = require("../cli/prefix");
Object.defineProperty(exports, "identityPrefix", { enumerable: true, get: function () { return prefix_1.identityPrefix; } });
Object.defineProperty(exports, "identityCommitmentPrefix", { enumerable: true, get: function () { return prefix_1.identityCommitmentPrefix; } });
Object.defineProperty(exports, "epkProofPrefix", { enumerable: true, get: function () { return prefix_1.epkProofPrefix; } });
Object.defineProperty(exports, "epkPublicSignalsPrefix", { enumerable: true, get: function () { return prefix_1.epkPublicSignalsPrefix; } });
Object.defineProperty(exports, "reputationProofPrefix", { enumerable: true, get: function () { return prefix_1.reputationProofPrefix; } });
Object.defineProperty(exports, "reputationPublicSignalsPrefix", { enumerable: true, get: function () { return prefix_1.reputationPublicSignalsPrefix; } });
Object.defineProperty(exports, "signUpProofPrefix", { enumerable: true, get: function () { return prefix_1.signUpProofPrefix; } });
Object.defineProperty(exports, "signUpPublicSignalsPrefix", { enumerable: true, get: function () { return prefix_1.signUpPublicSignalsPrefix; } });
