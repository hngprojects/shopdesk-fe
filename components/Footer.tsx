function Footer() {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <p className="text-center mt-4">
        © {new Date().getFullYear()}, Powered by Timbu Business
      </p>
    </div>
  );
}

export default Footer;
