import "./Header.css";

const Header = () => {
  return (
    <div className="Header">
      <div className="Header__Logo">
        <img src={require("../assets/logo.webp")} alt="logo"></img>
      </div>
      <h2 className="Header__Name">Ticket2Attraction</h2>
    </div>
  );
};

export default Header;
