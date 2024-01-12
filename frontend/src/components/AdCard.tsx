import Link from "next/link";
import React from "react";
import { CategoriesProps } from "./AdCategories";
import { useMutation, useQuery } from "@apollo/client";
import { deleteAds } from "../graphql/deleteAds";
import { getAllAds } from "@/graphql/getAllAds";
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

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

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

type AdType = {
  id: number;
  title: string;
  description: string;
  imgUrl: string;
  price: number;
  categories: CategoriesProps | null;
};

type AdCardProps = AdType & {
  // onDelete: () => void;
  onAddToTotalPrice: (price: number) => void;
};

const AdCard = ({
  id,
  title,
  imgUrl,
  price,
  description,
  // onDelete,
  onAddToTotalPrice,
}: AdCardProps) => {
  const [doDelete, { data, error, loading: deleteLoading }] = useMutation(
    deleteAds,
    {
      refetchQueries: [getAllAds],
    }
  );

  const addPrice = () => {
    {
      onAddToTotalPrice(price);
    }
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: "  0.5px 0.5px 5px grey" }}>
      <CardMedia component="img" alt="adImg" height="200" image={imgUrl} />

      <CardContent>
        <Typography gutterBottom variant="h5" component="div" color="#ad7a99">
          <Link href={`/ads/${id}/`} className="adcard-title-link">
            {title}
          </Link>
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {price + "€"}
        </Typography>
      </CardContent>
      <CardActions>
        <div className="dv-adCardDescription">
          <Button size="medium" onClick={addPrice}>
            Add
          </Button>

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
          <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default AdCard;
export type { AdCardProps, AdType };
