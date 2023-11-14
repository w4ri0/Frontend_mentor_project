// Attend que le DOM soit entièrement chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", function () {
    // Sélection des éléments du DOM nécessaires
    const t = document.getElementById("total-facture"), // Input du montant total de la facture
          e = document.querySelectorAll(".pourboire-pourcent"), // Sélection de tous les éléments avec la classe "pourboire-pourcent"
          n = document.querySelector(".input-personalise"), // Input pour un pourboire personnalisé
          o = document.getElementById("num-personne"), // Input pour le nombre de personnes
          c = document.querySelector(".pourboire-amount-total span"), // Affichage du montant du pourboire total
          a = document.querySelectorAll(".total-person-amount span"), // Affichage du montant total par personne
          s = document.querySelector(".reset-button"); // Bouton de réinitialisation

    // Fonction de mise à jour des calculs
    function u() {
        const s = parseInt(o.value) || 0; // Nombre de personnes
        if (s > 0) {
            const o = parseFloat(t.value) || 0; // Montant total de la facture
            let u = 0;

            // Parcourt tous les éléments avec la classe "pourboire-pourcent"
            e.forEach(function (t) {
                // Vérifie si l'élément a la classe "active"
                t.classList.contains("active") && (u = parseFloat(t.textContent) / 100);
            });

            // Si un pourboire personnalisé est saisi, utilise cette valeur
            "" !== n.value && (u = parseFloat(n.value) / 100);

            // Calcul des montants
            const i = o * u, // Montant du pourboire
                  r = o / s + i / s, // Montant total par personne
                  l = i / s; // Montant du pourboire par personne

            // Met à jour l'affichage
            c.textContent = "$" + l.toFixed(2);

            // Met à jour l'affichage pour chaque personne
            a.forEach(function (t) {
                t.textContent = "$" + r.toFixed(2);
            });
        } else {
            // Si le nombre de personnes est inférieur ou égal à 0, met à jour l'affichage à zéro
            c.textContent = "$0.00";
            a.forEach(function (t) {
                t.textContent = "$0.00";
            });
        }
    }

    // Fonction pour mettre à jour l'apparence visuelle des boutons de pourboire
    function i(t) {
        t.classList.contains("active")
            ? (t.style.backgroundColor = "var(--strong-cyan)")
            : (t.style.backgroundColor = "");
    }

    // Ajoute un écouteur d'événements pour la modification du montant total de la facture
    t.addEventListener("input", u);

    // Ajoute des écouteurs d'événements pour chaque bouton de pourboire
    e.forEach(function (t) {
        t.addEventListener("click", function () {
            const o = t.classList.contains("active");
            // Désactive tous les autres boutons de pourboire
            e.forEach(function (t) {
                t.classList.remove("active"), i(t);
            });
            // Active le bouton de pourboire cliqué
            o || (t.classList.add("active"), i(t));
            // Réinitialise la valeur du pourboire personnalisé
            n.value = "";
            // Met à jour les calculs
            u();
        });
    });

    // Ajoute un écouteur d'événements pour la modification du pourboire personnalisé
    n.addEventListener("input", u);

    // Ajoute un écouteur d'événements pour la modification du nombre de personnes
    o.addEventListener("input", u);

    // Ajoute un écouteur d'événements pour le bouton de réinitialisation
    s.addEventListener("click", function () {
        // Réinitialise les valeurs des champs et les boutons de pourboire
        t.value = "";
        e.forEach(function (t) {
            t.classList.remove("active"), i(t);
        });
        n.value = "";
        o.value = "";
        // Met à jour les calculs
        u();
    });
});
