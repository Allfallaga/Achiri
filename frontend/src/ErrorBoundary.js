import React from "react";

/**
 * ErrorBoundary – Achiri
 * Composant global de gestion d’erreur avec accessibilité, design avancé, sécurité et UX optimale.
 * - Affichage d’un message clair, détails techniques masqués par défaut.
 * - Focus automatique, aria-live, responsive, contraste élevé, SEO-friendly.
 * - Prêt pour extension (log externe, support, dark mode, multi-langues…).
 */

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    // TODO: Envoyer l'erreur à un service externe si besoin (Sentry, etc)
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <main
          role="alert"
          aria-live="assertive"
          tabIndex={-1}
          style={{
            color: "#e53935",
            background: "#fff",
            border: "1px solid #ffcdd2",
            borderRadius: 14,
            margin: "2rem auto",
            maxWidth: 600,
            padding: 32,
            fontFamily: "'Segoe UI', Arial, sans-serif",
            boxShadow: "0 2px 16px #e5393533",
            outline: "none",
          }}
          aria-label="Erreur critique – Achiri"
        >
          <h2 style={{ color: "#e53935", marginTop: 0, fontSize: "1.5em" }}>
            Une erreur est survenue
          </h2>
          <p>
            Désolé, une erreur inattendue est survenue dans l’application.
            <br />
            Essayez de recharger la page ou contactez le support si le problème
            persiste.
          </p>
          <details
            style={{
              whiteSpace: "pre-wrap",
              margin: "1em 0",
              color: "#b71c1c",
            }}
          >
            {this.state.error && (
              <summary style={{ cursor: "pointer", fontWeight: 500 }}>
                Détails techniques
              </summary>
            )}
            {this.state.error && <pre>{this.state.error.toString()}</pre>}
            {this.state.errorInfo && (
              <pre>{this.state.errorInfo.componentStack}</pre>
            )}
          </details>
          <button
            onClick={this.handleReload}
            style={{
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "0.7em 1.5em",
              fontSize: "1em",
              marginTop: 16,
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s",
            }}
            aria-label="Recharger la page"
            autoFocus
          >
            Recharger la page
          </button>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
