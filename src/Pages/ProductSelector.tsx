import { Box } from "@mui/system";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { getProducts, setProducts } from "../Model/ProductSlice";
import { getToken } from "../Model/UserSlice";

const ProductSelector = () => {
    const dispatch = useAppDispatch();
  const products = useSelector(getProducts);
  const token = useSelector(getToken);

  useEffect(() => {
    if (!products) {
        axios
          .get("http://localhost:1337/api/users/me?populate=avatar", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then(({ data }) => dispatch(setProducts(data)));
      }
  }, [products]);
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: "16px",
      }}
    ></Box>
  );
};

export default ProductSelector;
