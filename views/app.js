fetch(`http://ip-api.com/json/${json.ip}`)
    .then((res) => res.json())
    .then((data) => {
      var a = data.response.continent;
      console.log(a);
    });