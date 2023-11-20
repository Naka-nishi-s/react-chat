import { Box, Grid } from "@mui/material";
import { Chat } from "./Chat";

function App() {
  return (
    <Grid container spacing={2} sx={{ bgcolor: "pink" }}>
      {/* 左側の画像は、画面幅がsm以上の時にのみ表示 */}
      <Grid
        item
        sm={6}
        xs={0}
        style={{
          backgroundImage: "url(あなたの画像URL)",
          backgroundSize: "cover",
        }}
      >
        {/* 左側のコンテンツ（画像など） */}
      </Grid>
      {/* チャット部分は常に表示 */}
      <Grid item xs={12} sm={6}>
        <Box sx={{ p: 2 }}>
          <Chat />
        </Box>
      </Grid>
    </Grid>
  );
}

export default App;
