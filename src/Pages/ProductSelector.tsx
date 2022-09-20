import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { getProducts, setProducts } from "../Model/ProductSlice";
import { getToken } from "../Model/UserSlice";
import { ReactComponent as MonixCoin } from "./../assets/monixcoin.svg";
import { Product } from "../Model/types";

const ProductSelector = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(getProducts);
  const token = useSelector(getToken);

  //On crée un state "dictionnaire" ou pour chaque id de produit on met le montant dans l'input
  const [amount, setAmount] = useState<{ [productId in number]: number }>({});

  useEffect(() => {
    //TODO: Mettre plutot à nul dans l'initialState
    if (!products.length) {
      axios
        .get("http://localhost:1337/api/products?populate=*", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(({ data }) => dispatch(setProducts(data.data)));
    }
    // Quand les produits changent, on met à jour amounts
    const newAmount = { ...amount };
    for (let product of products) {
      if (!newAmount[product.id]) newAmount[product.id] = 1;
    }
    setAmount(newAmount);
  }, [products]);

  const buyproduct = (product: Product, amount: number) => {};

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: "16px",
        overflowY: "scroll",
        height: "100%",
      }}
    >
      {products.map((product) => (
        <Paper
          key={product.id}
          elevation={5}
          sx={{
            width: "80%",
            height: "30%",
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
            margin: "10px",
          }}
        >
          {/** Note a soi même : je deteste le mec qui a rendu les api ultra compliqué chez strapi :c */}
          <img
            src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
            style={{ width: "100%", height: "auto" }}
          />
          <Typography variant="h5">{product.attributes.Name}</Typography>
          <Typography
            variant="h6"
            sx={{ display: "flex", alignItems: "center" }}
          >
            {product.attributes.price}
            <MonixCoin style={{ marginLeft: ".25em" }} />
          </Typography>
          <Box sx={{ display: "flex" }}>
            <TextField
              label="Nombre"
              sx={{ m: 1, width: "25ch" }}
              InputProps={{ type: "number", inputProps: { min: 1 } }}
              value={amount[product.id]}
              onChange={(evt) => {
                const newAmount = { ...amount };
                newAmount[product.id] = Number(evt.currentTarget.value);
                setAmount(newAmount);
              }}
            />
            <Button onClick={() => buyproduct(product, amount[product.id])}>
              Acheter !
            </Button>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ProductSelector;
