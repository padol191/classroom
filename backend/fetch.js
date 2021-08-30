const fetch = require("node-fetch");
const handleLogin = () => {
  var email = "padol1@gmail.com";
  var password = "1234567";
  const loginInfo = {
    email: email,
    password: password,
  };

  fetch("http://localhost:5000/api/auth", {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginInfo),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.token) {
        let variable = data.token;
        let x = variable.toString();

        console.log(data.token);
        console.log("done");
        fetch("http://localhost:5000/api/auth", {
          method: "GET",
          headers: {
            Authorization: "Basic SGVsbG8gdGhlcmUgOikgSGF2ZSBhIGdvb2QgZGF5IQ==",
            "X-Auth-Token": x,
          },
        })
          .then((response) => {
            // console.log("done");
            console.log(response.data);
          })
          .then((user) => {
            console.log(user);
            // localStorage.setItem("id", user._id);
            // if('subject' in user)
            // {
            //     localStorage.setItem("user", "student")
            //     history.push("/student/dashboard");
            // }
            // else
            // {
            //     localStorage.setItem("user", "teacher");
            //     history.push("/teacher/dashboard");
            // }
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        // axios.get("http://localhost:5000/api/auth", {
        //     headers: {
        //     "x-auth-token": data.token,
        //     },
        // })
        // .then(res => {
        //     console.log(res.data);
        // });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
handleLogin();
