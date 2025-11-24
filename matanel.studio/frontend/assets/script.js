document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    const response = await fetch("https://matanel-studio-79613215467.us-central1.run.app/contact", {
        method: "POST",
        body: formData
    });

    const result = await response.json();
    alert(result.message);
});
