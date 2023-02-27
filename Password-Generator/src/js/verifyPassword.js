const passwordOutput = document.getElementById("output");

const strengthMeter = document.getElementById("strength-meter");

const btn = document.getElementById('start');

btn.addEventListener("click", () => updateStrengthMeter())
updateStrengthMeter()

function updateStrengthMeter() {

    const security = calculatePasswordStrength(passwordOutput.value);
    let strength = 100;
    
    security.forEach(security => {
        if(security == null) return
        strength -= security.deduction
    })
    strengthMeter.style.setProperty('--strength', strength)
}

function calculatePasswordStrength(password) {
    const weaknesses = [];
    weaknesses.push(lengthWeakness(password));
    weaknesses.push(lowercaseWeakness(password))
    weaknesses.push(uppercaseWeakness(password))
    weaknesses.push(numberWeakness(password))
    return weaknesses;
}

function lengthWeakness(password) {

    const length = password.length;

    if (length == 0) {
        return {
            deduction: 100,
        }
    }

    if (length <= 5) {
        return {
            deduction: 40,
        }
    }

    if (length <= 10) {
        return {
            deduction: 15,
        }
    }
}

function uppercaseWeakness(password) {
    return characterTypeWeakness(password, /[A-Z]/g);
}

function lowercaseWeakness(password) {
    return characterTypeWeakness(password, /[a-z]/g);
}

function numberWeakness(password) {
    return characterTypeWeakness(password, /[0-9]/g);
}

function specialCharactersWeakness(password) {
    return characterTypeWeakness(password, /[^0-9a-zA-Z\s]/g);
}

function characterTypeWeakness(password, regex) {
    const matches = password.match(regex) || []

    if (matches.length === 0) {
        return {
            deduction: 20,
        }
    }

    if (matches.length <= 6) {
        return {
            deduction: 5,
        }
    }
}