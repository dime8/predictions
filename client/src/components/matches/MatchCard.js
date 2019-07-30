import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, CardHeader, Button } from "@material-ui/core";
import "./Matches.css";

import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";

class MatchCard extends Component {
  render() {
    const { match, handleClickOpen } = this.props;
    let imageUrl = "";
    try {
      imageUrl = require(`../../static/images/cards/${match.type}.jpg`);
    } catch {
      imageUrl = require("../../static/images/cards/default.jpg");
    }

    return (
      <Card className="card">
        <CardActionArea>
          <CardMedia
            component="img"
            alt={match.type}
            height="120"
            image={imageUrl}
            title={match.type}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {match.hostname + " - " + match.guestname}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span className="matchContent">{match.type}</span>
              <br />
              <span className="matchContent">{match.league}</span>
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickOpen(match)}>
            See predictions
          </Button>
        </CardActions>
      </Card>
    );
  }
}
MatchCard.propTypes = {
  match: PropTypes.object.isRequired
};

export default connect(null)(MatchCard);
