function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <div className="my-3 text-center">&copy; Broadway, {currentYear}</div>
    </footer>
  );
}
export default Footer;
