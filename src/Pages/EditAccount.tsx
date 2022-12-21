import React from "react";
import { Avatar, Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { addSnackbarMessage, changePage } from "../Model/ApplicationSlice";
import { getAuthenticatedUser, setAuthenticatedUser } from "../Model/UserSlice";
import sendApiRequest from "../Model/WebApi";
import config from "../config";

const EditAccount = () => {
  const user = useSelector(getAuthenticatedUser);
  const dispatch = useAppDispatch();
  const [editedUser, setEditedUser] = useState(user);
  const [imageFile, setImageFile] = useState<File | undefined>();
  //Grosse flemme de typer ça
  const inputRef = useRef<HTMLInputElement>(null);

  const editUser = async () => {
    //On commence par uploader l'image
    if (imageFile) {
      console.log("On upload un fichier");
      const data = new FormData();
      data.append("avatar", imageFile);

      const result = await sendApiRequest({
        url: "/users/uploadAvatar",
        data,
        method: "POST",
      });
      console.log(result?.data);
    }

    //Puis on update le profil
    sendApiRequest({
      url: "/users/me",
      method: "PUT",
      data: {
        username: editedUser?.username,
        email: editedUser?.email,
      },
    }).then((response) => {
      if (response) dispatch(setAuthenticatedUser(response?.data?.data));
      dispatch(changePage("mainMenu"));
      dispatch(
        addSnackbarMessage({
          message: "Compte modifié ! ✍️",
          options: { variant: "success" },
        })
      );
    });
  };

  return (
    <>
      {editedUser && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "16px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/png"
            onChange={(evt) => {
              if (evt.currentTarget.files)
                setImageFile(evt.currentTarget.files[0]);
            }}
            hidden
          />
          {/** Todo: Faire un Joli effet pour faire comprendre que l'on peut changer son image */}
          <IconButton onClick={() => inputRef.current?.click()}>
            <Avatar
              sx={{ width: 128, height: 128 }}
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : `${config.urlBackend}/images/${editedUser.avatar}`
              }
            />
          </IconButton>
          <TextField
            label={"Pseudonyme"}
            variant="standard"
            value={editedUser.username || ""}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setEditedUser({
                ...editedUser,
                username: evt.currentTarget.value,
              })
            }
          />
          <TextField
            label={"Email"}
            variant="standard"
            value={editedUser.email || ""}
            sx={{ marginTop: "10px", width: "30ch" }}
            onChange={(evt) =>
              setEditedUser({
                ...editedUser,
                email: evt.currentTarget.value,
              })
            }
          />
          <Button
            variant="contained"
            size="large"
            sx={{ margin: "20px" }}
            onClick={editUser}
          >
            Modifier mes informations !
          </Button>
        </Box>
      )}
    </>
  );
};

export default EditAccount;
