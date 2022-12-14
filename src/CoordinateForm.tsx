import * as React from 'react';
import calculatePairData from './utils';

interface IFormState {
    coordinates: string;
    submitted: boolean;
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
            submittedCoordinates: {
                closestPairInfo: { closestPair: [], distance: 0 },
                furthestPairInfo: { furthestPair: [], distance: 0 },
                averageDistance: 0,
            }
        };
    }

    handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ coordinates: event.target.value });
    }

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const coordinatePairs = this.state.coordinates.split('\n');
        const res = calculatePairData(coordinatePairs);
        this.setState({ submittedCoordinates: res });
        this.setState({ submitted: true });
    }


    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Coordinate Pairs:
                    <textarea value={this.state.coordinates} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
                {this.state.submitted && (
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
            </form>
        );
    }
}

export default CoordinateForm;