import { Spinner} from 'react-bootstrap';

type SpinnerComponentProps = {
  message: string;
};

export const SpinnerComponent = ({ message }: SpinnerComponentProps) => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">{message}</span>
            </Spinner>
        </div>
    );
}