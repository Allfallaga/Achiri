import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthContext from '../../context/AuthProvider';
import App from './App';

describe('App', () => {
  test('affiche la page de connexion si non connecté', () => {
    render(
      <AuthContext.Provider value={{ auth: { loggedIn: false } }}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(
      screen.getByRole('button', { name: /connexion/i })
    ).toBeInTheDocument();
  });

  test('redirige vers /rooms si connecté', () => {
    render(
      <AuthContext.Provider value={{ auth: { loggedIn: true } }}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    // Vérifie la présence d'un titre ou d'un élément de Rooms (à adapter selon Rooms.js)
    expect(
      screen.getByText(/salons/i)
    ).toBeInTheDocument();
  });

  test('redirige toute route inconnue vers /', () => {
    render(
      <AuthContext.Provider value={{ auth: { loggedIn: false } }}>
        <MemoryRouter initialEntries={['/route-inconnue']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(
      screen.getByRole('button', { name: /connexion/i })
    ).toBeInTheDocument();
  });

  test('affiche la page Rooms si connecté et va sur /rooms', () => {
    render(
      <AuthContext.Provider value={{ auth: { loggedIn: true } }}>
        <MemoryRouter initialEntries={['/rooms']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(
      screen.getByText(/salons/i)
    ).toBeInTheDocument();
  });

  test('affiche la page de connexion si déconnecté et va sur /rooms', () => {
    render(
      <AuthContext.Provider value={{ auth: { loggedIn: false } }}>
        <MemoryRouter initialEntries={['/rooms']}>
          <App />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(
      screen.getByRole('button', { name: /connexion/i })
    ).toBeInTheDocument();
  });
});