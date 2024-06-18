import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';

const Register = ({ toggleForm }) => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      setSuccess('Inscription réussie, vous pouvez vous connecter.');
      setError('');
    } catch (err) {
      setError("Erreur d'inscription");
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h2>Inscription</h2>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Inscription</button>
      </form>
      <button onClick={toggleForm}>Connexion</button>
    </div>
  );
};

export default Register;