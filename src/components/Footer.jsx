import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Container>
      <hr />
      <p className="text-muted text-center">
        Did you like my work 🎉?{" "}
        <a
          href="https://github.com/webzth/webzth"
          target="_blank"
          rel="noreferrer"
        >
          check out my github
        </a>
      </p>
    </Container>
  );
};
export default Footer;
