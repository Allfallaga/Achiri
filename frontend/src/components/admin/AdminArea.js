import React from "react";

function AdminArea() {
  return (
    <section className="admin-area" aria-labelledby="admin-area-title">
      <h2 id="admin-area-title" className="sr-only">
        Zone d’administration
      </h2>
      <ul className="admin-actions" role="list">
        <li>
          <button
            className="btn btn--bordered admin-action"
            type="button"
            aria-label="Basculer public ou privé"
          >
            Public / Privé
          </button>
        </li>
        <li>
          <button
            className="btn btn--bordered admin-action"
            type="button"
            aria-label="Basculer audio seul ou vidéo seule"
          >
            Audio seul / Vidéo seule
          </button>
        </li>
        <li>
          <button
            className="btn btn--bordered admin-action"
            type="button"
            aria-label="Filtrer les URLs"
          >
            Filtrer les URLs
          </button>
        </li>
      </ul>
    </section>
  );
}

export default AdminArea;
