import React from "react";
import { Header, Container, Group, Anchor } from '@mantine/core';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const links = [
    { label: 'Home', to: '/' },
    { label: 'Projects', to: '/projects' },
    { label: 'About', to: '/about' },
  ];

  return (
    <Header height={60} sx={{ backgroundColor: '#1a1b1e' }} fixed>
      <Container sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Group spacing={50}>
          {links.map((link) => (
            <Anchor
              component={NavLink}
              key={link.to}
              to={link.to}
              sx={{ color: '#e8eaed', textDecoration: 'none', fontSize: 18 }}
              activeStyle={{ color: '#8ab4f8' }}
            >
              {link.label}
            </Anchor>
          ))}
        </Group>
      </Container>
    </Header>
  );
}
