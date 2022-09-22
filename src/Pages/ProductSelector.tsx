import { Button, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { getProducts, setProducts } from "../Model/ProductSlice";
import { changeUserBalance } from "../Model/UserSlice";
import { ReactComponent as MonixCoin } from "./../assets/monixcoin.svg";
import { Product } from "../Model/types";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import sendApiRequest from "../Model/WebApi";

const ProductSelector = () => {
  const dispatch = useAppDispatch();
  const products = useSelector(getProducts);
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [productFilter, setProductFilter] = useState("");

  //On crée un state "dictionnaire" ou pour chaque id de produit on met le montant dans l'input
  const [amount, setAmount] = useState<{ [productId in number]: number }>({});

  useEffect(() => {
    //TODO: Mettre plutot à nul dans l'initialState
    if (!products.length) {
      sendApiRequest({ url: "/products?populate=*", method: "GET" }).then(
        (response) => {
          if (response) dispatch(setProducts(response.data.data));
        }
      );
    }
    // Quand les produits changent, on met à jour amounts
    const newAmount = { ...amount };
    for (let product of products) {
      if (!newAmount[product.id]) newAmount[product.id] = 1;
    }
    setAmount(newAmount);
    // On ignore, car on veut seulement remplir amounts dans le callback
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products]);

  //Update Product with filter
  useEffect(() => {
    setDisplayedProducts(
      products.filter((prod) => prod.attributes.name.includes(productFilter))
    );
  }, [products, productFilter]);

  const buyproduct = (product: Product, amount: number) => {
    sendApiRequest({
      url: "/buy",
      method: "POST",
      data: {
        product: product.id,
        amount: amount,
      },
    }).then((response) => {
      //TODO: Ajouter un toast pour le feedback
      if (!response) return;
      dispatch(changeUserBalance(-product.attributes.price * amount));
      dispatch(changePage("mainMenu"));
      dispatch(
        addSnackbarMessage({
          message: "Produit acheté avec succès ! 🍫",
          options: { variant: "success" },
        })
      );
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        overflowY: "scroll",
      }}
    >
      <TextField
        variant="outlined"
        label="Votre recherche"
        sx={{ marginTop: "16px", width: "80vw" }}
        value={productFilter}
        onChange={(evt) => setProductFilter(evt.currentTarget.value)}
      />
      {displayedProducts.map((product) => (
        <Paper
          key={product.id}
          elevation={5}
          sx={{
            width: "80vw",
            height: "50vw",
            display: "flex",
            alignContent: "center",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "10px",
          }}
        >
          {/** Note a soi même : je deteste le mec qui a rendu les api ultra compliqué chez strapi :c */}
          <img
            src={`${process.env.REACT_APP_BACKEND_URL}${product.attributes.image.data.attributes.url}`}
            style={{
              maxHeight: "100%",
              maxWidth: "50vw",
              width: "auto",
              height: "auto",
            }}
            alt={product.attributes.name}
          />
          <Box sx={{ alignSelf: "flex-start", margin: "10px" }}>
            <Typography variant="h5">{product.attributes.name}</Typography>
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
                value={
                  amount[product.id] !== undefined ? amount[product.id] : 1
                }
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
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default ProductSelector;
