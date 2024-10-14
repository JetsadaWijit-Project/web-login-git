const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// GitHub strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/github/callback`
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails && profile.emails.length ? profile.emails[0].value : null;
    return done(null, { id: profile.id, username: profile.username, email });
}));

// GitLab strategy
passport.use(new GitLabStrategy({
    clientID: process.env.GITLAB_CLIENT_ID,
    clientSecret: process.env.GITLAB_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/gitlab/callback`
}, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails && profile.emails.length ? profile.emails[0].value : null;
    return done(null, { id: profile.id, username: profile.username, email });
}));
