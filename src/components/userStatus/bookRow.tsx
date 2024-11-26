import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { bookRowProp } from './studyCard'

export default function BookRow({
  bookName,
  chapterName,
  sectionName,
}: bookRowProp) {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Title
          </Typography>
          <Typography variant="h5" component="div">
            {" "}
             {bookName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Author
          </Typography>
          <Typography variant="body2">  {chapterName}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Year
          </Typography>
          <Typography variant="body2">{sectionName}</Typography>
        </CardContent>
      </Card>
    </>
  );
}
