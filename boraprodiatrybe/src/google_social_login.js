function saveToken(token) {
  localStorage.setItem(environments.ACCESS_TOKEN_KEY, token);
}

function sendCodeToApi(code) {
  const apiUrl = `${environments.API_URL}/social-login`;
  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
  })
    .then((response) => {
      if (response.status === 404) {
        throw new Error("Erro se comunicar com api");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      saveToken(data.token);
    })
    .catch((err) => {
      alert("ouve algum erro ao enviar dados para o servidor: " + err);
    });
}

function getClientId() {
  const apiUrl = `${environments.API_URL}/client-id`;
  return fetch(apiUrl)
    .then((resp) => resp.json())
    .then((data) => data.client_id)
    .catch((err) => `deu erro: ${err}`);
}

function start() {
  getClientId().then((clientId) => {
    gapi.load("auth2", function () {
      auth2 = gapi.auth2.init({
        client_id: clientId,
        scope: "https://www.googleapis.com/auth/calendar.events",
      });
    });
  });
  const googleSignInButton = document.querySelector("#signinButton");
  googleSignInButton.addEventListener("click", () => {
    auth2
      .grantOfflineAccess()
      .then((resp) => {
        console.log(resp);
        sendCodeToApi(resp.code);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}
