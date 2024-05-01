import "./Tickets.css";
const Tickets = () => {
  return (
    <div className="Tickets">
      <div className="Tickets__TopLabel">Tickets</div>
      <div className="Tickets__Item1">
        <div className="Tickets__Item1__LeftDetail">
          <div className="Tickets__Item1__LeftDetail__IMG">IMG</div>
          <div>
            <h2>Siam Amazing Park</h2>
            <p>Siam Amazing Park Everyday is Amazing</p>
            <p>สยามอะเมซิ่งเป็นอาณาจักรแห่งความสุขสนุกไม่รู้ลืม...</p>
          </div>
        </div>
        <div className="Tickets__Item1__RightDetail">
          <h2>1,000 THB</h2>
          <div className="Tickets__Item1__RightDetail__Button">
            <button>Add</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
