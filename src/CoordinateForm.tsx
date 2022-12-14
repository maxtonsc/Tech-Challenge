import * as React from 'react';
import calculatePairData from './utils';

interface IFormState {
    coordinates: string;
    submitted: boolean;
    valid: boolean;
    submittedCoordinates: {
        closestPairInfo: { closestPair: string[], distance: number },
        furthestPairInfo: { furthestPair: string[], distance: number },
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

        this.validation(this.state.coordinates);

        this.setState({ submitted: true });
    }

    validation = (coordinates: string) => {
        const formRegex = /^(\d+(?:\.\d+)?,\d+(?:\.\d+)?)(?:\s+(\d+(?:\.\d+)?,\d+(?:\.\d+)?))+$/;

        if (coordinates.match(formRegex)) {
            this.setState({ valid: true });
            const coordinatePairs = coordinates.split('\n');
            const res = calculatePairData(coordinatePairs);
            this.setState({ submittedCoordinates: res });
        } else {
            this.setState({ valid: false });
        }
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Coordinate Pairs:
                    <input type="text" name="coordinates" onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                {this.state.valid && this.state.submitted && (
                    <div>
                        {/* display data here */}
                        <p>Closest: {this.state.submittedCoordinates.closestPairInfo.closestPair[0]},
                            {this.state.submittedCoordinates.closestPairInfo.closestPair[1]}
                            <br />
                            {this.state.submittedCoordinates.closestPairInfo.closestPair[2]},
                            {this.state.submittedCoordinates.closestPairInfo.closestPair[3]} </p>
                        <p>Distance: {this.state.submittedCoordinates.closestPairInfo.distance}</p>
                        <br />
                        <p>Furthest: {this.state.submittedCoordinates.furthestPairInfo.furthestPair[0]},
                            {this.state.submittedCoordinates.furthestPairInfo.furthestPair[1]}
                            <br />
                            {this.state.submittedCoordinates.furthestPairInfo.furthestPair[2]},
                            {this.state.submittedCoordinates.furthestPairInfo.furthestPair[3]}
                        </p>
                        <p>Distance: {this.state.submittedCoordinates.furthestPairInfo.distance}</p>
                        <br />
                        <p>Average Distance: {this.state.submittedCoordinates.averageDistance}</p>
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
            </form>
        );
    }
}

export default CoordinateForm;