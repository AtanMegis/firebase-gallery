import { Container } from '@mui/material';
import ImageList from './components/ImageList/ImageList';
import Navbar from './components/Navbar/Navbar';
import Loading from './components/UI/Loading';
import MainNotification from './components/UI/MainNotification';
import Modal from './components/UI/Modal';
import Upload from './components/Upload/Upload';
import ResetPassword from './components/User/ResetPassword';
import Verification from './components/User/Verification';
import AuthContext from './context/AuthContext';

function App() {
	return (
		<div className="App">
			<Container
				maxWidth="lg"
				sx={{ textAlign: 'center', mt: '3rem' }}
			>
				<AuthContext>
					<Loading />
					<Modal />
					<Verification />
					<MainNotification />
					<Navbar />
					<Upload />
					<ImageList />
				</AuthContext>
			</Container>
		</div>
	);
}

export default App;
