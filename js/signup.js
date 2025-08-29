document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        try {
            const res = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (res.ok) {
                alert("Signup berhasil! Silakan login.");
                window.location.href = "Login.html";
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.error(err);
            alert("Terjadi kesalahan. Silakan coba lagi.");
        }
    });
});
