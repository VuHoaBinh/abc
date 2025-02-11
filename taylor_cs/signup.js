import { Firebase } from "./class/firebase.js"; //import Firebase Library to validate stored sign-up details with input login details
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
const firebase = new Firebase();

function sleep(ms) { 
  return new Promise((resolve) => setTimeout(resolve, ms)); //control execution flow
}

function handleAuthStateChanged(user) {
  if (user) {
    window.location.href = "../index.html";
  } else {
    async function signUp(e) {
      e.preventDefault();

      const displayName = document.getElementById("signup-name").value; 
      const email = document.getElementById("signup-email").value;
      const password = document.getElementById("signup-password").value;
      const passwordConfirm = document.getElementById(
        "signup-password-confirm"
      ).value;
      //getElementById tag uses the assigned value of an input to retain the value for later manipulation

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //setting a condition to validate the input email format
      if (!emailPattern.test(email)) {
        Swal.fire({ //Swal.fire is a platform to display an error message if occured
          title: "Sign up unsuccessful",
          text: "Please enter a valid email address.",
          icon: "error",
        });
        return;
      }

      if (password !== passwordConfirm) {
        Swal.fire({
          title: "Sign in unsuccessful",
          text: "Passwords do not match.",
          icon: "error",
        });
        return;
      }

      const signUpButton = document.querySelector(".btn-login[type='submit']");
      signUpButton.disabled = true;

      try {
        const result = await firebase.register(email, password);
        await firebase.update(displayName);
        await sleep(2000);

        Swal.fire({ //using the Swal.fire platform to export error message on the screen 
          title: "Sign up successful",
          text: "Welcome to my website",
          icon: "success",
        });
        console.log(result);
        // window.location.href = "../index.html";
      } catch (error) { //using the try , catch function to detect error
        await sleep(2000);
        Swal.fire({
          title: "Sign up unsuccessful", //If an error is caught, export an alert message on user's screen
          text: error.message || "Something went wrong.",
          icon: "error",
        });
        console.error(error);
      } finally {
        signUpButton.disabled = false;
      }
    }

    document.getElementById("signup-form").addEventListener("submit", signUp);
  }
}
onAuthStateChanged(firebase.auth, handleAuthStateChanged);
