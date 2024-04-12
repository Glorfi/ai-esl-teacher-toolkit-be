import bcrypt from 'bcrypt';
import { Users } from '../db/mongoConnector.js';
import { DuplicateError } from '../errors/DuplicateError.js';
import { AuthorizationRequired } from '../errors/AuthorizationRequired.js';
import jsonwebtoken from 'jsonwebtoken';
import { NotFound } from '../errors/NotFound.js';
export const createUser = (req, res, next) => {
    const { email, password } = req.body;
    bcrypt
        .hash(password, 10)
        .then((hash) => {
        return Users.create({
            email,
            password: hash,
        });
    })
        .then((user) => {
        const userData = {
            email: user.email,
            role: user.role,
        };
        res.status(201).send(userData);
    })
        .catch((error) => {
        if (error.name === 'MongoServerError' && error.code === 11000) {
            const duplicateKeyError = new DuplicateError('Try another email');
            return next(duplicateKeyError);
        }
        next(error);
    });
};
export const login = (req, res, next) => {
    const { email, password } = req.body;
    Users.findOne({ email })
        .select('+password')
        .then((user) => {
        if (!user) {
            throw new AuthorizationRequired('Wrong email or password');
        }
        return bcrypt
            .compare(password, user.password)
            .then((match) => {
            if (!match) {
                throw new AuthorizationRequired('Wrong email or password');
            }
            return user;
        })
            .then((user) => {
            const token = jsonwebtoken.sign({ _id: user._id }, 'supersecret', {
                expiresIn: '14d',
            });
            return token;
        })
            .then((token) => res.send({ jwt: token }));
    })
        .catch(next);
};
export const getCurrentUser = (req, res, next) => {
    const { _id } = req.user;
    Users.findById(_id)
        .populate({
        path: 'exercises',
        populate: [
            { path: 'sentenceList', model: 'sentences' },
            { path: 'topicList', model: 'topics' },
        ],
    })
        .then((user) => {
        if (!user) {
            throw new NotFound('User is not found');
        }
        return res.send(user);
    })
        .catch(next);
};
//# sourceMappingURL=users.js.map