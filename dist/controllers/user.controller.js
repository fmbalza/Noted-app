"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUsername = exports.changePassword = exports.signIn = exports.signUp = void 0;
const user_1 = __importDefault(require("../models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function createToken(user) {
    return jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, config_1.default.jwtSecret, {
        expiresIn: 86400
    });
}
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name || !req.body.lastname || !req.body.email || !req.body.password || !req.body.username) {
        return res.status(400).json({ msg: 'Plase. Send your email, user and password' });
    }
    const user = yield user_1.default.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
        return res.status(400).json({ msg: 'The user already exist' });
    }
    const newUser = new user_1.default(req.body);
    yield newUser.save();
    return res.status(201).json(newUser);
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ msg: 'Plase. Send your user and password' });
    }
    const user = yield user_1.default.findOne({ username: req.body.username });
    if (!user) {
        return res.status(400).json({ msg: 'The user does not exist' });
    }
    const isMatch = yield user.comparePassword(req.body.password);
    if (isMatch) {
        return res.status(200).json({ token: createToken(user) });
    }
    return res.status(400).json({
        msg: 'The user or password are incorrect'
    });
});
exports.signIn = signIn;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, currentPassword, newPassword } = req.body;
    if (!email || !currentPassword || !newPassword) {
        return res.status(400).json({ msg: 'Please provide email, current password, and new password' });
    }
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        const isMatch = yield user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Current password is incorrect' });
        }
        user.password = newPassword;
        yield user.save();
        return res.status(200).json({ msg: 'Password changed successfully' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
exports.changePassword = changePassword;
const changeUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, username, newUsername } = req.body;
    if (!email || !newUsername) {
        return res.status(400).json({ msg: 'Please provide email and new username' });
    }
    try {
        const user = yield user_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }
        user.username = newUsername;
        yield user.save();
        return res.status(200).json({ msg: 'Username changed successfully' });
    }
    catch (error) {
        return res.status(500).json({ msg: 'Internal server error' });
    }
});
exports.changeUsername = changeUsername;
