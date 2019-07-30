import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMatches } from "../../actions/matchActions";
import MatchCard from "./MatchCard";
import PredictionsDialog from "../predictions/PredictionsDialog";

import { createFragmentContainer, graphql } from "react-relay";

class Matches extends Component {
  state = {
    open: false,
    openedMatch: {}
  };

  handleClickOpen = match => () => {
    this.setState({ open: true, openedMatch: match });
  };

  handleClose = () => {
    this.setState({ open: false, openedMatch: {} });
  };
  componentDidMount() {
    this.props.getMatches();
  }

  render() {
    const { matches } = this.props;
    const { openedMatch } = this.state;
    return (
      <React.Fragment>
        <div className="flexContainer">
          {matches.map(match => (
            <MatchCard
              key={match.id}
              match={match}
              handleClickOpen={this.handleClickOpen}
            />
          ))}
        </div>
        {Object.keys(openedMatch).length !== 0 && (
          <PredictionsDialog
            open={this.state.open}
            match={openedMatch}
            handleClose={this.handleClose}
          />
        )}
      </React.Fragment>
    );
  }
}

Matches.propTypes = {
  matches: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  matches: state.match.matches
});

// export default connect(
//   mapStateToProps,
//   { getMatches }
// )(Matches);
export default createFragmentContainer(
  Matches,
  graphql`
    fragment Matches_viewer on Viewer {
      allLinks(last: 100, orderBy: createdAt_DESC)
        @connection(key: "Matches_allMatches", filters: []) {
        edges {
          node {
            ...Link_link
          }
        }
      }
    }
  `
);
