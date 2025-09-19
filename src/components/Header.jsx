import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../store/store";

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        setUser({
          id: 1,
          name: "Иван Иванов",
          email: "ivan@example.com",
        }),
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <header className="header">
      <h1>🛒 Интернет-магазин</h1>
      <div className="user-info">{user ? <span>Привет, {user.name}!</span> : <span>Загрузка...</span>}</div>
    </header>
  );
};

export default Header;
