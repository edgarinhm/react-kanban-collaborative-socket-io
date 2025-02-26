const Navigation = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="nav-title">{"KanBan Board"}</div>
      <div className="nav-actions">
        <button className="btn" onClick={() => onLogout()}>
          {"Logout"}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
