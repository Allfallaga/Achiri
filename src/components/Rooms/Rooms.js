import React from "react";
import axios from "../../api/axios";
import Box from "@mui/material/Box";


import Room from '../Room/Room'

function Rooms(props) {
  const [rooms, setRooms] = React.useState([]);
  const ROOMS_URL = "/room";

  React.useEffect(async () => {
    try {
        const response = await axios.get(ROOMS_URL);
        console.log(response.data)
      if (response.data.length > 0) {
        setRooms(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          columnGap: 2,
          rowGap: 2,
          gridTemplateColumns: "repeat(4, 1fr)",
        }}
      >
        {rooms.map((v, k) => {
            return (
              <Room data={v}></Room>
            // <Link key={v.id} to={"/chatroom/" + v.id}>
            //   <Button color="secondary">{v.name}</Button>
            // </Link>
          );
        })}
      </Box>
    </div>
  );
}

export default Rooms;
