import { Container } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer>
      <Container>
        <p>&copy; {new Date().getFullYear()} LeagueManager</p>
      </Container>
    </footer>
  );
};

export default Footer;
