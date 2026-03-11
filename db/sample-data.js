"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_ts_edge_1 = require("bcrypt-ts-edge");
var sampleData = {
    users: [
        {
            name: "admincole",
            email: "admin@cjplabs.com",
            password: (0, bcrypt_ts_edge_1.hashSync)("kaL1nb9*&lDF", 10),
            role: "admin",
        },
    ],
};
exports.default = sampleData;
