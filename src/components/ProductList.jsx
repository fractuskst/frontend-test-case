import { useEffect, useState, useMemo } from "react";
import { setProducts, setLoading, selectProducts, selectLoading } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../store/store";
import mockProducts from "../data/mockProducts";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);
  const loading = useSelector(selectLoading);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(setLoading(true));
    const timer = setTimeout(() => {
      dispatch(setProducts(mockProducts));
      dispatch(setLoading(false));
    }, 1000);

    return () => clearTimeout(timer);
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => (sortBy === "name" ? a.name.localeCompare(b.name) : a.price - b.price));
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (loading) {
    return <div className="loading">Загрузка товаров...</div>;
  }

  return (
    <div className="product-list">
      <div className="filters">
        <div className="search">
          <input type="text" placeholder="Поиск товаров..." value={searchTerm} onChange={handleSearchChange} />
        </div>

        <div className="filter-controls">
          {showFilters && (
            <>
              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">Все категории</option>
                <option value="phones">Телефоны</option>
                <option value="laptops">Ноутбуки</option>
                <option value="tablets">Планшеты</option>
              </select>

              <select value={sortBy} onChange={handleSortChange}>
                <option value="name">По названию</option>
                <option value="price">По цене</option>
              </select>
            </>
          )}

          <button onClick={() => setShowFilters(!showFilters)}>
            {showFilters ? "Скрыть фильтры" : "Показать фильтры"}
          </button>
        </div>
      </div>

      <div className="products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <div className="price">${product.price}</div>
            <button onClick={() => handleAddToCart(product)}>Добавить в корзину</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
