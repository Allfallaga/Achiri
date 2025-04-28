import { render, screen } from '@testing-library/react';
import App from './App';
import { HelmetProvider } from 'react-helmet-async';

// Test 1: Vérifie que l'app se rend sans crash
test('App se rend sans crash', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
});

// Test 2: Vérifie que le header principal est présent et accessible
test('Le header principal est affiché', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const header = screen.getByRole('banner');
  expect(header).toBeInTheDocument();
  expect(header).toHaveTextContent(/Achiri - Plateforme IA Inclusive/i);
});

// Test 3: Vérifie que le footer est présent et accessible
test('Le footer est affiché', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const footer = screen.getByRole('contentinfo');
  expect(footer).toBeInTheDocument();
  expect(footer).toHaveTextContent(/Achiri/i);
});

// Test 4: Vérifie que la page Dashboard s'affiche par défaut
test('La page Dashboard s\'affiche par défaut', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  expect(screen.getByText(/Accessibilité, santé, domotique, éducation & influence/i)).toBeInTheDocument();
});

// Test 5: Vérifie la présence du main content pour l'accessibilité
test('Le main content est accessible', () => {
  render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
  const main = screen.getByRole('main');
  expect(main).toBeInTheDocument();
  expect(main).toHaveAttribute('tabindex', '-1');
});