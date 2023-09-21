import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <section>
      <h1>404</h1>
      <h2>La page que vous cherchez est introuvable</h2>
      <Link to={`/`}>Retour à l'accueil</Link>
    </section>
  );
}

export default ErrorPage;
