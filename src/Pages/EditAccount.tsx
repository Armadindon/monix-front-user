import { Avatar, Button, IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  useRef,
  useState,
} from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hook";
import { changePage } from "../Model/ApplicationSlice";
import {
  getAuthenticatedUser,
  getToken,
  setAuthenticatedUser,
} from "../Model/UserSlice";
import axios from "axios";
import sendApiRequest from "../Model/WebApi";

const EditAccount = () => {
  const user = useSelector(getAuthenticatedUser);
  const token = useSelector(getToken);
  const dispatch = useAppDispatch();
  const [editedUser, setEditedUser] = useState(user);
  const [imageFile, setImageFile] = useState<File | undefined>();
  //Grosse flemme de typer ça
  const inputRef = useRef<any>();

  const editUser = async () => {
    let uploadedImageId = undefined;
    //On commence par uploader l'image
    if (imageFile) {
      console.log("On upload un fichier");
      const data = new FormData();
      data.append("files", imageFile);

      const result = await sendApiRequest({
        url: "/upload",
        data,
        method: "POST",
      });
      console.log(result?.data);
      uploadedImageId = result?.data[0].id;
    }

    //Puis on update le profil
    sendApiRequest({
      url: "/users/me",
      method: "POST",
      data: {
        username: editedUser?.username,
        email: editedUser?.email,
        avatar: uploadedImageId,
      },
    }).then((response) => {
      if (response) dispatch(setAuthenticatedUser(response?.data));
      dispatch(changePage("mainMenu"));
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
            accept="image/*"
            onChange={(evt) => {
              if (evt.currentTarget.files)
                setImageFile(evt.currentTarget.files[0]);
            }}
            hidden
          />
          {/** Todo: Faire un Joli effet pour faire comprendre que l'on peut changer son image */}
          <IconButton onClick={() => inputRef.current.click()}>
            <Avatar
              sx={{ width: 128, height: 128 }}
              src={
                imageFile
                  ? URL.createObjectURL(imageFile)
                  : `${process.env.REACT_APP_BACKEND_URL}${editedUser.avatar?.url}`
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
