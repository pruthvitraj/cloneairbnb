const list = require("../new_data/schema");
const Review = require("../new_data/review");
const accesslogin = require("../middelware");
const login = require("../new_data/login");

module.exports.rederformregister = (req, res) => {
    res.render("register.ejs")
};

module.exports.rederformlogin = (req, res) => {
    res.render("login.ejs")
};

module.exports.registeruser = async (req, res, next) => {
    try {
        const { email, username, password } = req.body; // ✅ "username" must exist
        if (!username || !password) {
            return res.status(400).send("Username and password are required.");
        }
        var user = new login({ username, email });
        let newuser = await login.register(user, password);
        req.login(newuser, (err) => {
            if (err) {
                next(err);
            }
            else {
                req.flash("success", "You dairect logined");
                res.redirect("/showlist");
            }
        })
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
};

module.exports.logout = (req, res, err) => {
    req.logOut((err) => {
        if (err) {
            return next(err)
        }
        else {
            req.flash("success", "The successfully logout from account");
            res.redirect("/showlist");
        }
    }
    )
};