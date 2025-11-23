document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("http://127.0.0.1:8000/contact", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    alert(result.message);
});
