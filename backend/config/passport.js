// backend/config/passport.js

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const Auth0Strategy = require('passport-auth0');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');

// ================== JWT STRATEGY ==================
passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        },
        async (jwt_payload, done) => {
            try {
                const user = await User.findById(jwt_payload.id);
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

// ================== GOOGLE OAUTH STRATEGY ==================
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({
                    $or: [
                        { googleId: profile.id },
                        { email: profile.emails?.[0]?.value }
                    ]
                });

                if (user) {
                    if (!user.googleId) {
                        user.googleId = profile.id;
                        await user.save();
                    }
                    return done(null, user);
                }

                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    avatar: profile.photos?.[0]?.value,
                    emailVerified: true
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// ================== AUTH0 OAUTH STRATEGY ==================
passport.use(
    new Auth0Strategy(
        {
            domain: process.env.AUTH0_DOMAIN,
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: '/api/auth/auth0/callback'
        },
        async (accessToken, refreshToken, extraParams, profile, done) => {
            try {
                let user = await User.findOne({
                    $or: [
                        { auth0Id: profile.id },
                        { email: profile.emails?.[0]?.value }
                    ]
                });

                if (user) {
                    if (!user.auth0Id) {
                        user.auth0Id = profile.id;
                        await user.save();
                    }
                    return done(null, user);
                }

                user = await User.create({
                    auth0Id: profile.id,
                    name: profile.displayName,
                    email: profile.emails?.[0]?.value,
                    avatar: profile.photos?.[0]?.value,
                    emailVerified: profile.email_verified || true
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// ================== FACEBOOK OAUTH STRATEGY ==================
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FB_CLIENT_ID,
            clientSecret: process.env.FB_CLIENT_SECRET,
            callbackURL: '/api/auth/facebook/callback',
            profileFields: ['id', 'emails', 'name', 'picture.type(large)']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({
                    $or: [
                        { facebookId: profile.id },
                        { email: profile.emails?.[0]?.value }
                    ]
                });

                if (user) {
                    if (!user.facebookId) {
                        user.facebookId = profile.id;
                        await user.save();
                    }
                    return done(null, user);
                }

                user = await User.create({
                    facebookId: profile.id,
                    name: `${profile.name.givenName} ${profile.name.familyName}`,
                    email: profile.emails?.[0]?.value,
                    avatar: profile.photos?.[0]?.value,
                    emailVerified: true
                });

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

// ================== SERIALIZE & DESERIALIZE ==================
passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

module.exports = passport;
