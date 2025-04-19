document.getElementById("generateButton").addEventListener("click", () => {
  // passwordLength
  const passwordLength = document.getElementById("passwordLength").value;

  const password = generateRandomPassword(passwordLength || 12);
  document.getElementById("passwordField").value = password;

  // Copy the password to the clipboard
  navigator.clipboard
    .writeText(password)
    .then(() => {
      // alert("Password copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy password:", err);
      alert("Failed to copy password. Please try again.");
    });
});

function generateRandomPassword(length) {
  if (length < 4) {
    throw new Error("Password length must be at least 4 to include all character types.");
  }

  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*()_+[]{}|;:,.<>?";
  const allChars = lowercase + uppercase + numbers + specialChars;
  // console.log("All Characters:", allChars);

  let password = "";

  // Ensure at least one character from each category
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += specialChars[Math.floor(Math.random() * specialChars.length)];

  // Fill the rest of the password with random characters from all categories
  const randomValues = new Uint32Array(length - 4);
  window.crypto.getRandomValues(randomValues);

  // console.log("Random Values:", randomValues);

  for (let i = 0; i < randomValues.length; i++) {
    const randomIndex = randomValues[i] % allChars.length;
    console.log("Random Index:", randomIndex);
    password += allChars[randomIndex];
  }

  // Shuffle the password to randomize the order of characters
  console.log("Password before shuffle:", password);
  password = password
    .split("")
    .sort(() => Math.random() - 0.5)
    .join("");

  // console.log("Password after shuffle:", password);

  return password;
}
