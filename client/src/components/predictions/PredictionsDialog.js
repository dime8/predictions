import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import DialogTitle from "@material-ui/core/DialogTitle";
import { getMatchPredictions } from "../../actions/predictionsActions";
import "./Predictions.css";

class PredictionsDialog extends React.Component {
  state = {
    predictions: [],
    id: null,
    open: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.open !== prevState.open) {
      nextProps.getMatchPredictions(nextProps.match.id);
    }
    return {
      open: nextProps.open,
      id: nextProps.match.id,
      predictions: nextProps.predictions
    };
  }

  render() {
    const { predictions, handleClose } = this.props;
    return (
      <div>
        <Dialog
          open={this.props.open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
        >
          <DialogTitle id="scroll-dialog-title">Predictions</DialogTitle>
          <DialogContent className="Content">
            <DialogContentText>
              {Object.keys(predictions).length !== 0 ? (
                predictions.map(prediction => (
                  <React.Fragment key={prediction.id}>
                    <span className="predictionUser">
                      {prediction.username}:{" "}
                    </span>
                    <span className="predictionScore">{prediction.score}</span>
                    <br />
                  </React.Fragment>
                ))
              ) : (
                <span className="predictionUser">
                  There are no predictions for this match!
                </span>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="Actions">
            <Button onClick={handleClose} /* color="primary"*/>Close</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
PredictionsDialog.propTypes = {
  match: PropTypes.object.isRequired,
  predictions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  predictions: state.prediction.predictions
});
export default connect(
  mapStateToProps,
  { getMatchPredictions }
)(PredictionsDialog);
