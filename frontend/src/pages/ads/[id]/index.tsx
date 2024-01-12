import { AdType } from "../../../components/AdCard";
import Layout from "../../../components/Layout";
import { useRouter } from "next/router";
import Link from "next/link";
import { useQuery } from "@apollo/client";
import { getAd } from "../../../graphql/getAd";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {
  Avatar,
  Collapse,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import { useState } from "react";
import dynamic from "next/dynamic";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const MapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Ad() {
  const router = useRouter();
  const adId = router.query.id;

  const { data, error, loading } = useQuery<{ item: AdType }>(getAd, {
    variables: {
      id: adId,
    },
    skip: adId === undefined,
  });
  const ad = data ? data.item : null;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Layout title="AdById">
      {ad ? (
        <div className="adById">
          <Card
            sx={{
              minWidth: 400,
              maxWidth: 400,
              minHeight: 380,
              boxShadow: "0.5px 0.5px 5px grey",
            }}
          >
            <CardMedia
              component="img"
              alt="imgCard"
              height="350"
              image={ad.imgUrl}
            />
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                color="#ad7a99"
              >
                <Link className="adcard-title-link" href={`/ads/${ad.id}/`}>
                  {ad.title}
                </Link>
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {ad.price + "€"}
              </Typography>
            </CardContent>
            <CardActions>
              <div className="dv-adCardDescription">
                {/* <Button size="medium" onClick={addPrice}>
                    Add
                  </Button> */}
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                  size="small"
                >
                  <img
                    src="/images/arrowDescription.png"
                    className="img-descriptionBtn"
                  />
                </ExpandMore>
              </div>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{ad.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
          <MapComponent />
        </div>
      ) : null}
    </Layout>
  );
}
