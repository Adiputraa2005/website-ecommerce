document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (res.ok) {
        alert("Login berhasil");
        localStorage.setItem("token", "Bearer " + data.token);
        window.location.href = "home.html"; // redirect
    } else {
        alert(data.message);
    }
});
