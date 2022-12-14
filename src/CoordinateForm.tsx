import * as React from 'react';
import * as utils from './utils';

interface IFormState {
    coordinates: string;
    submitted: boolean;
    valid: boolean;
    submittedCoordinates: {
        closestPairInfo: utils.closestPairInfo,
        furthestPairInfo: utils.furthestPairInfo,
        averageDistance: number,
    }
}

class CoordinateForm extends React.Component<{}, IFormState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            coordinates: '',
            submitted: false,
            valid: false,
            submittedCoordinates: {
                closestPairInfo: { closestPair: [], distance: 0 },
                furthestPairInfo: { furthestPair: [], distance: 0 },
                averageDistance: 0,
            }
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ coordinates: event.currentTarget.value });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // If validated then set state to true and can proceed to calculating pair data
        // Also sets submittedCoordinates to a collection of values in case we want to keep the
        // values shown on an error, seems more extendable and clear this way
        if (utils.validation(this.state.coordinates) !== false) {
            this.setState({ valid: true });
            const coordinatePairs = this.state.coordinates.split('\n');
            const res = utils.calculatePairData(coordinatePairs);
            this.setState({ submittedCoordinates: res });
        } else {
            this.setState({ valid: false });
        }
        this.setState({ submitted: true });
    }




    render() {
        const { submittedCoordinates } = this.state;
        const {
            closestPairInfo,
            furthestPairInfo,
            averageDistance
        } = submittedCoordinates;
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Coordinate Pairs: </label>
                <input type="text" name="coordinates" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
                <div style={{ minHeight: "500px" }}>
                    {this.state.valid && this.state.submitted && (
                        <div>
                            <p>Closest: {closestPairInfo.closestPair[0]},
                                {closestPairInfo.closestPair[1]}
                                <br />
                                {closestPairInfo.closestPair[2]},
                                {closestPairInfo.closestPair[3]} </p>
                            <p>Distance: {closestPairInfo.distance}</p>
                            <br />
                            <p>Furthest: {furthestPairInfo.furthestPair[0]},
                                {furthestPairInfo.furthestPair[1]}
                                <br />
                                {furthestPairInfo.furthestPair[2]},
                                {furthestPairInfo.furthestPair[3]}
                            </p>
                            <p>Distance: {furthestPairInfo.distance}</p>
                            <br />
                            <p>Average Distance: {averageDistance}</p>
                            <br />
                        </div>
                    )}
                    {!this.state.valid && this.state.submitted && (
                        <div>
                            <p>Invalid input</p>
                            <p>try submitting a string such as</p>
                            <p>0,1.234 3,8 4,3 10,13</p>
                        </div>
                    )}
                </div>
            </form>
        );
    }
}

export default CoordinateForm;