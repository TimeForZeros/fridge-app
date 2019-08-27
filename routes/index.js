var express = require("express");
var router = express.Router();
var passport = require("passport");

router.get("/", function(req, res, next) {
  res.redirect("/users");
});

//Google OAuth login route
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/items",
    failureRedirect: "/users"
  })
);

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/users');
})

module.exports = router;
