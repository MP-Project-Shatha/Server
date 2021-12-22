const userModel = require("../../db/models/user");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const nodemailer = require("nodemailer");
const SECRET_KEY = process.env.SECRET_KEY;
const SECRET_RESET_KEY = process.env.SECRET_RESET_KEY;
const CLIENT_URL = "http://localhost:5000";

const login = (req, res) => {
  const { username,  password } = req.body;
  const SECRET_KEY = process.env.SECRET_KEY;
  if (!(( username) && password)) {
    res.status(200).json({ msg: "Kindly fill all inputs" });
  } else {
    userModel
      .findOne({ $or: [{ username }, ] })
      .then(async (result) => {
        if (result) {
          if ( username === result.username) {
            const payload = {
              id: result._id,
              role: result.role,
            };
            const options = {
              expiresIn: "30m",
            };
            const token = jwt.sign(payload, SECRET_KEY, options);
            const unhashPassword = await bcrypt.compare(
              password,
              result.password
            );
            if (unhashPassword) {
              res.status(200).json({ result, token });
            } else {
              res.status(200).json("invalid username/ password");
            }
          } else {
            res.status(200).json("invalid username/ password");
          }
        } else {
          res.status(200).json("Username  does not exist");
        }
      })
      .catch((err) => {
        res.status(200).json(err);
      });
  }
};
///
const resgister = (req, res) => {
  const { username, email, password, password2 } = req.body;
  let errors = [];

  if (!username || !email || !password || !password2 ) {
    errors.push({ msg: "Please enter all fields" });
  }

  if (password != password2) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 8) {
    errors.push({ msg: "Password must be at least 8 characters" });
  }

  if (errors.length > 0) {
    res.status(200).json({
      errors,
      username,
      email,
      password,
      password2,
    });
  } else {
    userModel.findOne({ email: email }).then((user) => {
      if (user) {
        errors.push({ msg: "Email ID already registered" });
        res.status(200).json({
          errors,
          username,
          email,
          password,
          password2,
        });
      } else {
        const oauth2Client = new OAuth2(
          "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com", // ClientID
          "OKXIYR14wBB_zumf30EC__iJ", // Client Secret
          "https://developers.google.com/oauthplayground" // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token:
            "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign(
          { username, email, password },
          SECRET_KEY,
          {
            expiresIn: "30m",
          }
        );

        const output = `
                  <h2>Please click on below link to activate your account</h2>
                  <p>${CLIENT_URL}/activate/${token}</p>
                  <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
                  `;

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            type: "OAuth2",
            user: "nodejsa@gmail.com",
            clientId:
              "173872994719-pvsnau5mbj47h0c6ea6ojrl7gjqq1908.apps.googleusercontent.com",
            clientSecret: "OKXIYR14wBB_zumf30EC__iJ",
            refreshToken:
              "1//04T_nqlj9UVrVCgYIARAAGAQSNwF-L9IrGm-NOdEKBOakzMn1cbbCHgg2ivkad3Q_hMyBkSQen0b5ABfR8kPR18aOoqhRrSlPm9w",
            accessToken: accessToken,
          },
        });

        const mailOptions = {
          from: '"Auth Admin" <nodejsa@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Account Verification: NodeJS Auth ✔", // Subject line
          generateTextFromHTML: true,
          html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            res.status(200).json({
              err: "Something went wrong on our end. Please register again.",
            });
          } else {
            console.log("Mail sent : %s", info.response);
            res.status(200).json({
              message:
                "Activation link sent to email ID. Please activate to log in.",
            });
          }
        });
      }
    });
  }
};
const activate = (req, res) => {
  const token = req.params.token;
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, decodedToken) => {
      if (err) {
        res.json({ err: "Incorrect or expired link! Please register again." });
      } else {
        const { username, email, password } = decodedToken;
        userModel.findOne({ email: email }).then((user) => {
          if (user) {
            res.json({ err: "Email ID already registered! Please log in." });
          } else {
            const newUser = new userModel({
              username,
              email,
              password,
           
            });

            bcrypt.hash(newUser.password, 10, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  res.json({ success: user });
                })
                .catch((err) => console.log(err));
            });
          }
        });
      }
    });
  } else {
    console.log("Account activation error!");
  }
};

module.exports = { resgister, activate, login };
